import { login } from './utils/login';
import { harbors } from './pages/harbors';

fixture`Navigate and view`.page`https://venepaikka-admin.test.kuva.hel.ninja/`;

test('Navigate and view basic data', async t => {
  await login(t);

  await t
    .click(harbors.harborsList.firstHarborLink)
    .expect(harbors.harborDetails.address.innerText)
    .contains('Helsinki');
});
