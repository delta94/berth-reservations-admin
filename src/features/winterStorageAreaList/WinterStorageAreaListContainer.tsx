import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import WinterStorageAreaList from './WinterStorageAreaList';
import { WINTER_STORAGE_AREAS } from './__generated__/WINTER_STORAGE_AREAS';
import { WINTER_STORAGE_AREA_QUERY } from './queries';
import { WinterStorageAreaData } from './types';
import { getWinterStorageAreasData } from './utils';

const WinterStorageAreaListContainer = () => {
  const { loading, data } = useQuery<WINTER_STORAGE_AREAS>(WINTER_STORAGE_AREA_QUERY);
  const tableData: WinterStorageAreaData[] = getWinterStorageAreasData(data);

  return <WinterStorageAreaList data={tableData} loading={loading} />;
};

export default WinterStorageAreaListContainer;
