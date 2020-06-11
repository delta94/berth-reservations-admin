import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { HARBORS_QUERY } from './harborsQuery';
import { getHarborsData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborListPage from './HarborListPage';
import { HarborData } from './types';

const HarborsContainer = () => {
  const { loading, data } = useQuery<HARBORS>(HARBORS_QUERY, { fetchPolicy: 'cache-first' });
  const tableData: HarborData[] = getHarborsData(data);

  return <HarborListPage data={tableData} loading={loading} />;
};

export default HarborsContainer;
