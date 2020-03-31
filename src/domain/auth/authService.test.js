import axios from 'axios';

import authService, { API_TOKENS } from './authService';

jest.mock('axios');

describe('authService', () => {
  const userManager = authService.userManager;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem.mockClear();
    jest.restoreAllMocks();
  });

  describe('getUser', () => {
    it('should call getUser from oidc', () => {
      const getUser = jest.spyOn(userManager, 'getUser');

      authService.getUser();

      expect(getUser).toHaveBeenCalledTimes(1);
    });

    it('should resolve to the user value which has been resolved from getUser', async () => {
      const mockUser = { name: 'Sam Littel' };

      jest.spyOn(userManager, 'getUser').mockResolvedValueOnce(mockUser);

      const user = await authService.getUser();

      expect(user).toBe(mockUser);
    });
  });

  describe('getTokens', () => {
    it('should get API_TOKENS from localStorage', () => {
      authService.getTokens();

      expect(localStorage.getItem).toHaveBeenNthCalledWith(1, API_TOKENS);
    });
  });

  describe('isAuthenticated', () => {
    it('should get oidc user from sessionStorage', () => {
      authService.isAuthenticated();

      expect(sessionStorage.getItem).toHaveBeenNthCalledWith(
        1,
        `oidc.user:${process.env.REACT_APP_TUNNISTAMO_URI}:${process.env.REACT_APP_TUNNISTAMO_CLIENT_ID}`
      );
    });

    it('should call getTokens', () => {
      jest.spyOn(authService, 'getTokens');
      authService.isAuthenticated();

      expect(authService.getTokens).toHaveBeenCalledTimes(1);
    });

    it('should return false if getTokens returns null', () => {
      jest.spyOn(authService, 'getTokens').mockReturnValue(null);

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't exist", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.clear();

      expect(authService.isAuthenticated()).toBe(false);
    });

    it("should return false if oidc user from sessionStorage doesn't have an access_token property", () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const invalidUser = JSON.stringify({});

      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.setItem(
        `oidc.user:${process.env.REACT_APP_TUNNISTAMO_URI}:${process.env.REACT_APP_TUNNISTAMO_CLIENT_ID}`,
        invalidUser
      );

      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true if oidc user is valid and tokens are returned from getTokens', () => {
      const apiTokens = '5ed3abc5-9b65-4879-8d09-3cd8499650ef';
      const validUser = JSON.stringify({
        name: 'Mr. Louisa Tromp',
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        access_token: '5ed3abc5-9b65-4879-8d09-3cd8499650ef',
      });

      jest.spyOn(authService, 'getTokens').mockReturnValue(apiTokens);
      sessionStorage.setItem(
        `oidc.user:${process.env.REACT_APP_TUNNISTAMO_URI}:${process.env.REACT_APP_TUNNISTAMO_CLIENT_ID}`,
        validUser
      );

      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('login', () => {
    it('should call signinRedirect from oidc with the provided path', () => {
      const path = '/applications';
      const signinRedirect = jest.spyOn(userManager, 'signinRedirect');

      authService.login(path);

      expect(signinRedirect).toHaveBeenNthCalledWith(1, { data: { path } });
    });
  });

  describe('endLogin', () => {
    axios.get.mockResolvedValue({ data: {} });
    /* eslint-disable-next-line @typescript-eslint/camelcase */
    const access_token = 'db237bc3-e197-43de-8c86-3feea4c5f886';
    const mockUser = {
      name: 'Penelope Krajcik',
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      access_token,
    };

    it('should call signinRedirectCallback from oidc', () => {
      const signinRedirectCallback = jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockImplementation(() => Promise.resolve(mockUser));

      authService.endLogin();

      expect(signinRedirectCallback).toHaveBeenCalledTimes(1);
    });

    it('should return the same user object returned from signinRedirectCallback', async () => {
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      const user = await authService.endLogin();

      expect(user).toBe(mockUser);
    });

    it('should call axios.get with the access_token attached as an Authorization header', async () => {
      jest
        .spyOn(userManager, 'signinRedirectCallback')
        .mockReturnValue(Promise.resolve(mockUser));

      await authService.endLogin();

      expect(axios.get).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          baseURL: expect.any(String),
          /* eslint-disable-next-line @typescript-eslint/camelcase */
          headers: { Authorization: `bearer ${access_token}` },
        })
      );
    });
  });

  describe('renewToken', () => {
    it('should call signinSilent from oidc', () => {
      const signinSilent = jest.spyOn(userManager, 'signinSilent');

      authService.renewToken();

      expect(signinSilent).toHaveBeenCalledTimes(1);
    });

    it('should resolve to the user value which has been resolved from signinSilent', async () => {
      const mockUser = { name: 'Camilla Howe' };

      jest.spyOn(userManager, 'signinSilent').mockResolvedValueOnce(mockUser);

      const user = await authService.renewToken();

      expect(user).toBe(mockUser);
    });
  });

  describe('endRenewToken', () => {
    it('should call signinSilentCallback from oidc', () => {
      const signinSilentCallback = jest.spyOn(
        userManager,
        'signinSilentCallback'
      );

      authService.endRenewToken();

      expect(signinSilentCallback).toHaveBeenCalledTimes(1);
    });

    it('should resolve to the user value which has been resolved from signinSilentCallback', async () => {
      const mockUser = { name: 'Delores Willms' };

      jest
        .spyOn(userManager, 'signinSilentCallback')
        .mockResolvedValueOnce(mockUser);

      const user = await authService.endRenewToken();

      expect(user).toBe(mockUser);
    });
  });

  describe('logout', () => {
    it('should call signoutRedirect from oidc', () => {
      const signoutRedirect = jest.spyOn(userManager, 'signoutRedirect');

      authService.logout();

      expect(signoutRedirect).toHaveBeenCalledTimes(1);
    });

    it('should remove the tokens from localStorage', async () => {
      jest.spyOn(userManager, 'signoutRedirect').mockResolvedValue(undefined);
      const apiTokens = 'a8d56df4-7ae8-4fbf-bf73-f366cd6fc479';

      localStorage.setItem(API_TOKENS, apiTokens);
      await authService.logout();

      expect(localStorage.getItem(API_TOKENS)).toBeNull();
    });
  });
});
