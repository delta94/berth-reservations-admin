import { ssoLogin } from "../pages/ssoLogin";
import { login as loginPage } from "../pages/login";
import { testUsername, testUserPassword } from "./settings";
import { navigation } from "../pages/navigation";

export const login = async (t: TestController) => {
  await t
    .click(loginPage.loginButton)
    .click(ssoLogin.loginLink)
    .typeText(ssoLogin.username, testUsername())
    .typeText(ssoLogin.password, testUserPassword())
    .click(ssoLogin.loginButton)
    // For some reason the login page is displayed again even
    // tough the user should be already logged in by sso
    .expect(loginPage.loginButton.exists).ok();

  // For some reason this reload is needed in order to display the app
  // clicking the login button again doesn't work
  await t.wait(2000);
  await t.eval(() => location.reload());
  await t.expect(navigation.sidebarContainer.exists).ok();
};
