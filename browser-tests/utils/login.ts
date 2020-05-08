import { ssoLogin } from '../pages/ssoLogin';
import { ClientFunction } from 'testcafe';
import { login as loginPage } from '../pages/login';
import { testUsername, testUserPassword } from './settings';

export const login = async (t: TestController) => {
  await t
    .click(loginPage.loginButton)
    .click(ssoLogin.loginLink)
    .typeText(ssoLogin.username, testUsername())
    .typeText(ssoLogin.password, testUserPassword())
    .click(ssoLogin.loginButton)
    .expect(getLocation())
    .contains('venepaikka-admin.test.kuva.hel.ninja')
    .wait(1000);

  await t.eval(() => location.reload());
};

const getLocation = ClientFunction(() => document.location.href);
