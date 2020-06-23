import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { HARBORS_QUERY } from './queries';
import { getHarborsData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborListPage from './HarborListPage';
import { HarborData } from './types';

const HarborListPageContainer = () => {
  const { loading, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const tableData: HarborData[] = getHarborsData(data);

  return <HarborListPage data={tableData} loading={loading} />;
};

export default HarborListPageContainer;
