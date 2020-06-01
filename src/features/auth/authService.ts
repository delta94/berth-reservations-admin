import { UserManager, User, UserManagerSettings, Log } from 'oidc-client';
import axios from 'axios';

const origin = window.location.origin;
export const API_TOKENS = 'apiTokens';

class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      /* eslint-disable @typescript-eslint/camelcase */
      authority: process.env.REACT_APP_TUNNISTAMO_URI,
      automaticSilentRenew: true,
      client_id: process.env.REACT_APP_TUNNISTAMO_CLIENT_ID,
      redirect_uri: `${origin}/callback`,
      post_logout_redirect_uri: origin,
      response_type: 'id_token token',
      silent_redirect_uri: `${origin}/silent-callback.html`,
      scope: process.env.REACT_APP_TUNNISTAMO_SCOPE,
      /* eslint-enable @typescript-eslint/camelcase */
    };

    // Logger
    Log.logger = console;
    Log.level = Log.ERROR;

    // User Manager instance
    this.userManager = new UserManager(settings);

    // Public methods
    this.getUser = this.getUser.bind(this);
    this.getTokens = this.getTokens.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.endLogin = this.endLogin.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.logout = this.logout.bind(this);

    // Events
    this.userManager.events.addAccessTokenExpired((e) => {
      this.logout();
    });

    this.userManager.events.addSilentRenewError(() => {
      this.logout();
    });

    this.userManager.events.addUserSignedOut(() => {
      this.userManager.clearStaleState();
      localStorage.removeItem(API_TOKENS);
    });

    this.userManager.events.addUserLoaded((user) => {
      this.fetchApiTokens(user);
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public getTokens(): string | null {
    return localStorage.getItem(API_TOKENS);
  }

  public isAuthenticated() {
    const oidcStorage = sessionStorage.getItem(
      `oidc.user:${process.env.REACT_APP_TUNNISTAMO_URI}:${process.env.REACT_APP_TUNNISTAMO_CLIENT_ID}`
    );
    const apiTokens = this.getTokens();

    return !!oidcStorage && !!JSON.parse(oidcStorage).access_token && !!apiTokens;
  }

  public login(path = '/'): Promise<void> {
    return this.userManager.signinRedirect({ data: { path } });
  }

  public async endLogin(): Promise<User> {
    const user = await this.userManager.signinRedirectCallback();
    await this.fetchApiTokens(user);
    return user;
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(API_TOKENS);
    this.userManager.clearStaleState();
    await this.userManager.signoutRedirect();
  }

  private async fetchApiTokens(user: User): Promise<void> {
    const { data: apiTokens } = await axios.get(`${process.env.REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT}/`, {
      baseURL: process.env.REACT_APP_TUNNISTAMO_URI,
      headers: {
        Authorization: `bearer ${user.access_token}`,
      },
    });

    localStorage.setItem(API_TOKENS, JSON.stringify(apiTokens));
  }
}

export default new AuthService();
