import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Page from '../page/Page';
import { INDIVIDUAL_HARBOR_QUERY } from './individualHarborQuery';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData } from './utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(
    INDIVIDUAL_HARBOR_QUERY,
    { variables: { id } }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const harbor = getIndividualHarborData(data);
  if (!harbor) return <p>No data...</p>;

  return (
    <Page>
      <IndividualHarborPage>{harbor.name}</IndividualHarborPage>
    </Page>
  );
};

export default IndividualHarborPageContainer;
