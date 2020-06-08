import { login } from './utils/login';
import { envUrl } from './utils/settings';
import { hasLength, hasPrice, inputHasPrice } from './utils/valueUtils';
import { navigation } from './pages/navigation';
import { customers } from './pages/customers';

fixture('Customer list view').page(envUrl());

test('Selection of customers', async (t) => {
  await login(t);

  await t
    .click(navigation.customers)
    .click(customers.customerList.firstCustomerLink)
    .expect(customers.customerView.firstDataLabel.filter(hasLength).exists)
    .ok();

  await t
    .click(customers.customerList.selectAllToggle)
    .click(customers.customerList.paginationNextButton)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('10');
  // assert 10

  await t
    .click(customers.customerList.selectAllToggle)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('20');
  // assert 20

  await t.click(customers.customerList.deselectAll).expect(customers.customerList.selectedCount.exists).notOk();
});
