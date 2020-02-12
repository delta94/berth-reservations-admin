import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { HARBORS_QUERY } from './harborsQuery';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborsPage from './HarborsList';

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);

  if (error) return <p>Error</p>;
  const tableData: HarborData[] = getHarborsData(data);

  return (
    <LoadingSpinner isLoading={loading}>
      <HarborsPage data={tableData} />
    </LoadingSpinner>
  );
};

export default HarborsContainer;
