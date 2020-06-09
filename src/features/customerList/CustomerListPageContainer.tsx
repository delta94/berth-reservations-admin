import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';

import { CUSTOMERS_QUERY } from './queries';
import { getCustomersData } from './utils';
import { CUSTOMERS, CUSTOMERSVariables as CUSTOMERS_VARS } from './__generated__/CUSTOMERS';
import CustomerList from './CustomerListComponent';
import CustomerListPage from './CustomerListPage';
import { usePagination } from '../../common/utils/usePagination';
import { useBackendSorting } from '../../common/utils/useBackendSorting';
import { SearchBy } from '../applicationView/ApplicationViewPage';
import { usePrevious } from '../../common/utils/usePrevious';
import { MessageFormValues } from './types';

const CustomerListPageContainer: React.FC = () => {
  const { t } = useTranslation();

  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.LAST_NAME);
  const [searchVal, setSearchVal] = useState<string>('');

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));

  const [debouncedSearchVal] = useDebounce(searchVal, 500, {
    equalityFn: (prev, next) => prev === next,
    leading: true,
  });

  const prevSearchBy = usePrevious(searchBy);

  const customersVars: CUSTOMERS_VARS = {
    first: pageSize,
    after: cursor,
    orderBy,
    [searchBy]: prevSearchBy === searchBy ? debouncedSearchVal : searchVal,
  };

  const { data, loading } = useQuery<CUSTOMERS, CUSTOMERS_VARS>(CUSTOMERS_QUERY, {
    variables: customersVars,
  });

  const handleSendMessage = (customerIds: string[], message: MessageFormValues) => {
    alert(`CustomerIds: ${JSON.stringify(customerIds)} content: ${JSON.stringify(message)}`);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    // Prevent hook running on initial mount because it would force to first page on landing with direct url
    // regardless of the page param
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Go to the first page when search values
      goToPage(0);
    }
  }, [searchVal, searchBy, goToPage]);

  const tableData = getCustomersData(data);

  return (
    <CustomerListPage>
      <CustomerList
        loading={loading}
        data={tableData}
        onSortedColChange={handleSortedColChange({ name: 'lastName' })}
        pagination={{
          forcePage: pageIndex,
          pageCount: getPageCount(data?.profiles?.count),
          onPageChange: ({ selected }) => goToPage(selected),
        }}
        tableTools={{
          searchVal,
          searchBy,
          setSearchVal,
          setSearchBy,
          searchByOptions: [
            { value: SearchBy.FIRST_NAME, label: t('common.firstName') },
            { value: SearchBy.LAST_NAME, label: t('common.lastName') },
            { value: SearchBy.EMAIL, label: t('common.email') },
            { value: SearchBy.ADDRESS, label: t('common.address') },
          ],
        }}
        handleSendMessage={handleSendMessage}
      />
    </CustomerListPage>
  );
};

export default CustomerListPageContainer;
