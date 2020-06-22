import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import WinterStorageAreaListPage from './WinterStorageAreaListPage';
import { WINTER_STORAGE_AREAS } from './__generated__/WINTER_STORAGE_AREAS';
import { WINTER_STORAGE_AREA_QUERY } from './queries';
import { WinterStorageAreaData } from './types';
import { getWinterStorageAreasData } from './utils';

const WinterStorageAreaListPageContainer = () => {
  const { loading, data } = useQuery<WINTER_STORAGE_AREAS>(WINTER_STORAGE_AREA_QUERY);
  const tableData: WinterStorageAreaData[] = getWinterStorageAreasData(data);

  return <WinterStorageAreaListPage data={tableData} loading={loading} />;
};

export default WinterStorageAreaListPageContainer;
