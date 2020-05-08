import { login } from './utils/login';
import { harbors } from './pages/harbors';
import { envUrl } from './utils/settings';

fixture('Navigate and view').page(envUrl());

test('Navigate and view basic data', async t => {
  await login(t);

  await t
    .click(harbors.harborsList.firstHarborLink)
    .expect(harbors.harborDetails.address.innerText)
    .contains('Helsinki');
});
