import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { HARBORS_QUERY } from './harborsQuery';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborsPage from './HarborsList';

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (!data) return <div>No data...</div>;
  if (error) return <div>Error</div>;

  const tableData: HarborData[] = getHarborsData(data);

  return <HarborsPage data={tableData} />;
};

export default HarborsContainer;
