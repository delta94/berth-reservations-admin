import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import UnmarkedWsNoticeList from './UnmarkedWsNoticeList';
import { usePagination } from '../../common/utils/usePagination';
import { useBackendSorting } from '../../common/utils/useBackendSorting';
import {
  UNMARKED_WINTER_STORAGE_APPLICATIONS,
  UNMARKED_WINTER_STORAGE_APPLICATIONSVariables as UNMARKED_WINTER_STORAGE_APPLICATIONS_VARS,
} from './__generated__/UNMARKED_WINTER_STORAGE_APPLICATIONS';
import { UNMARKED_WINTER_STORAGE_APPLICATIONS_QUERY } from './queries';
import { getUnmarkedWinterStorageNotice } from './utils';

const UnmarkedWsNoticeListContainer = () => {
  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));
  const { loading, data } = useQuery<UNMARKED_WINTER_STORAGE_APPLICATIONS, UNMARKED_WINTER_STORAGE_APPLICATIONS_VARS>(
    UNMARKED_WINTER_STORAGE_APPLICATIONS_QUERY,
    {
      variables: {
        first: pageSize,
        after: cursor,
        orderBy,
      },
    }
  );
  const notices = getUnmarkedWinterStorageNotice(data);
  const pageCount = getPageCount(data?.winterStorageApplications?.count);

  return (
    <UnmarkedWsNoticeList
      notices={notices}
      loading={loading}
      pageCount={pageCount}
      pageIndex={pageIndex}
      goToPage={goToPage}
      onSortedColChange={handleSortedColChange({ createdAt: 'createdAt' })}
    />
  );
};

export default UnmarkedWsNoticeListContainer;
