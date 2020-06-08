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
<<<<<<< HEAD
  // assert 10
=======
>>>>>>> cca6bfa... Add browser tests for customer selection

  await t
    .click(customers.customerList.selectAllToggle)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('20');
<<<<<<< HEAD
  // assert 20
=======
>>>>>>> cca6bfa... Add browser tests for customer selection

  await t.click(customers.customerList.deselectAll).expect(customers.customerList.selectedCount.exists).notOk();
});
