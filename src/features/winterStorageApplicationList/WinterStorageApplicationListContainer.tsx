import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import WinterStorageApplicationList from './WinterStorageApplicationList';
import { getWinterStorageApplicationData } from './utils';
import { usePagination } from '../../common/utils/usePagination';
import { useBackendSorting } from '../../common/utils/useBackendSorting';
import {
  WINTER_STORAGE_APPLICATIONS,
  WINTER_STORAGE_APPLICATIONSVariables as WINTER_STORAGE_APPLICATIONS_VARS,
} from './__generated__/WINTER_STORAGE_APPLICATIONS';
import { WINTER_STORAGE_APPLICATIONS_QUERY } from './queries';

const WinterStorageApplicationListContainer = () => {
  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));
  const { loading, data } = useQuery<WINTER_STORAGE_APPLICATIONS, WINTER_STORAGE_APPLICATIONS_VARS>(
    WINTER_STORAGE_APPLICATIONS_QUERY,
    {
      variables: {
        first: pageSize,
        after: cursor,
        orderBy,
      },
    }
  );
  const applications = getWinterStorageApplicationData(data);
  const pageCount = getPageCount(data?.winterStorageApplications?.count);

  return (
    <WinterStorageApplicationList
      applications={applications}
      loading={loading}
      pageCount={pageCount}
      pageIndex={pageIndex}
      goToPage={goToPage}
      onSortedColChange={handleSortedColChange({ createdAt: 'createdAt' })}
    />
  );
};

export default WinterStorageApplicationListContainer;
