import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import { INDIVIDUAL_WINTER_STORAGE_AREA_QUERY } from './queries';
import { INDIVIDUAL_WINTER_STORAGE_AREA } from './__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import { getIndividualWinterStorageArea, getWinterStoragePlaces, getWinterStorageSections } from './utils';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import WinterStorageAreaView from './WinterStorageAreaView';

const WinterStorageAreaViewContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery<INDIVIDUAL_WINTER_STORAGE_AREA>(INDIVIDUAL_WINTER_STORAGE_AREA_QUERY, {
    variables: { id },
  });

  const winterStorageArea = getIndividualWinterStorageArea(data);
  const places = getWinterStoragePlaces(data);
  const sections = getWinterStorageSections(data);

  if (loading || !winterStorageArea) return <LoadingSpinner isLoading={true} />;

  return <WinterStorageAreaView winterStorageArea={winterStorageArea} places={places} sections={sections} />;
};

export default WinterStorageAreaViewContainer;
