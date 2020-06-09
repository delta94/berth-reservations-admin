import { login } from './utils/login';
import { envUrl } from './utils/settings';
import { navigation } from './pages/navigation';
import { customers } from './pages/customers';

fixture('Customer list view').page(envUrl());

test('Selection of customers', async (t) => {
  await login(t);

  await t
    .click(navigation.customers)
    .click(customers.customerList.selectAllToggle)
    .click(customers.customerList.paginationNextButton)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('10');

  await t
    .click(customers.customerList.selectAllToggle)
    .expect(customers.customerList.selectedCount.textContent)
    .contains('20');

  await t.click(customers.customerList.deselectAll).expect(customers.customerList.selectedCount.exists).notOk();
});
