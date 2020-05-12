import { login } from './utils/login';
import { envUrl } from './utils/settings';
import { applications } from './pages/applications';
import { hasLength } from './utils/textUtils';
import { navigation } from './pages/navigation';
import { harbors } from './pages/harbors';

fixture('Navigate and view').page(envUrl());

test('Navigate and view basic data', async t => {
  await login(t);

  // Applications
  await t
    .click(navigation.applications)
    .click(applications.applicationList.firstApplicationLink)
    .expect(
      applications.applicationDetails.firstName.filter(hasLength).exists
    )
    .ok();

  // Harbors
  await t
    .click(navigation.harbors)
    .click(harbors.harborsList.firstHarborLink)
    .expect(harbors.harborDetails.address.innerText)
    .contains('Helsinki');
});
