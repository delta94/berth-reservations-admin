import { Selector } from 'testcafe';

export const ssoLogin = {
  loginLink: Selector('.login-method-helusername'),
  username: Selector('#username'),
  password: Selector('#password'),
  loginButton: Selector('#kc-login'),
};
