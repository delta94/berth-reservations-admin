import { login } from './utils/login';
import { envUrl } from './utils/settings';
import { navigation } from './pages/navigation';
import { customers } from './pages/customers';

fixture('Customer list view').page(envUrl());

test('Selection of customers', async (t) => {
  await login(t);

  // Select all customers from first page
  await t
    .click(navigation.customers)
    .click(customers.customerList.selectAllToggle)
    .click(customers.customerList.paginationNextButton)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('10');

  // Select one customer from the second page
  await t
    .click(customers.customerList.selectFirstCustomer)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('11');

  // Unselect all customers
  await t.click(customers.customerList.deselectAll).expect(customers.customerList.selectedCount.exists).notOk();
});
