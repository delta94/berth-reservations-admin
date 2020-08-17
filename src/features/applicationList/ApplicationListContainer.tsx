import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import ApplicationList from './ApplicationList';
import {
  BERTH_APPLICATIONS,
  BERTH_APPLICATIONSVariables as BERTH_APPLICATIONS_VARS,
} from './__generated__/BERTH_APPLICATIONS';
import { getBerthApplicationData } from './utils';
import { BERTH_APPLICATIONS_QUERY } from './queries';
import { useDeleteBerthApplication } from '../../common/mutations/deleteBerthApplication';
import { usePagination } from '../../common/utils/usePagination';
import { useBackendSorting } from '../../common/utils/useBackendSorting';

const ApplicationListContainer = () => {
  const [onlySwitchApps, setOnlySwitchApps] = useState<boolean>();

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();
  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));
  const berthApplicationsVars: BERTH_APPLICATIONS_VARS = {
    first: pageSize,
    after: cursor,
    switchApplications: onlySwitchApps,
    orderBy,
  };

  const { loading, data } = useQuery<BERTH_APPLICATIONS, BERTH_APPLICATIONS_VARS>(BERTH_APPLICATIONS_QUERY, {
    variables: berthApplicationsVars,
  });

  const [deleteDraftedApplication, { loading: isDeleting }] = useDeleteBerthApplication();

  const handleDeleteLease = async (id: string) => {
    await deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const tableData = getBerthApplicationData(data);

  return (
    <ApplicationList
      data={data}
      getPageCount={getPageCount}
      goToPage={goToPage}
      handleDeleteLease={handleDeleteLease}
      onSortedColChange={handleSortedColChange({ createdAt: 'createdAt' })}
      isDeleting={isDeleting}
      loading={loading}
      onlySwitchApps={onlySwitchApps}
      pageIndex={pageIndex}
      setOnlySwitchApps={setOnlySwitchApps}
      tableData={tableData}
    />
  );
};

export default ApplicationListContainer;
