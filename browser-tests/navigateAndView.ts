import { login } from './utils/login';
import { envUrl } from './utils/settings';
import { applications } from './pages/applications';
import { hasLength, hasPrice, inputHasPrice } from './utils/valueUtils';
import { navigation } from './pages/navigation';
import { harbors } from './pages/harbors';
import { customers } from './pages/customers';
import { pricing } from './pages/pricing';
import { winterStorageAreas } from './pages/winterStorageAreas';

fixture('Navigate and view').page(envUrl());

test('Navigate and view basic data', async (t) => {
  await login(t);

  // Applications
  await t
    .click(navigation.applications)
    .click(applications.applicationList.firstApplicationLink)
    .expect(applications.applicationView.firstName.filter(hasLength).exists)
    .ok();

  // Winter storage applications
  await t
    .click(navigation.winterStorageApplications)
    .click(applications.applicationList.firstApplicationLink)
    .expect(applications.applicationView.firstName.filter(hasLength).exists)
    .ok();

  // Harbors
  await t
    .click(navigation.harbors)
    .click(harbors.harborList.firstHarborLink)
    .expect(harbors.harborView.address.filter(hasLength).exists)
    .ok();

  // Winter storage areas
  await t
    .click(navigation.winterStorageAreas)
    .expect(winterStorageAreas.winterStorageAreaList.firstWinterStorageArea.filter(hasLength).exists)
    .ok();

  // Customers
  await t
    .click(navigation.customers)
    .click(customers.customerList.firstCustomerLink)
    .expect(customers.customerView.firstDataLabel.filter(hasLength).exists)
    .ok();

  // Pricing
  await t.click(navigation.pricing).expect(pricing.berthPrices.firstPrivatePrice.filter(hasPrice).exists).ok();

  // Pricing modal
  await t
    .click(pricing.berthPrices.editPriceButton)
    .expect(pricing.berthPrices.priceModal.privatePrice.filter(inputHasPrice).exists)
    .ok();
});
