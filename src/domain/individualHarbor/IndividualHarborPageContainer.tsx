import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { UseGlobalFiltersOptions } from 'react-table';

import Table, { Column } from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './queries';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import {
  getIndividualHarborData,
  getBerths,
  Berth,
  getPiers,
} from './utils/utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';
import HarborProperties from './harborProperties/HarborProperties';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { formatDimension } from '../../common/utils/format';
import PierSelectHeader from './pierSelectHeader/PierSelectHeader';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(
    INDIVIDUAL_HARBOR_QUERY,
    { variables: { id } }
  );
  const { t, i18n } = useTranslation();

  const includesCaseInsensitive = React.useCallback(
    (target: string, value: string): boolean => {
      return target
        .toLocaleLowerCase(i18n.language)
        .includes(value.toLocaleLowerCase(i18n.language));
    },
    [i18n.language]
  );

  const berthTableGlobalFilter: UseGlobalFiltersOptions<
    Berth
  >['globalFilter'] = React.useMemo(
    () => (rows, _, filterValue) => {
      return rows.filter(row => {
        const { number, identifier, length, width, mooringType } = row.values;
        const numberMatch = String(number) === filterValue;
        const identifierMatch = String(identifier) === filterValue;
        const lengthMatch = includesCaseInsensitive(length, filterValue);
        const widthMatch = includesCaseInsensitive(width, filterValue);
        const mooringTypeMatch = includesCaseInsensitive(
          mooringType,
          filterValue
        );
        return (
          numberMatch ||
          identifierMatch ||
          lengthMatch ||
          widthMatch ||
          mooringTypeMatch
        );
      });
    },
    [includesCaseInsensitive]
  );

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>Error</div>;

  const harbor = getIndividualHarborData(data);

  if (!harbor) return <div>No data...</div>;

  const columns: Column<Berth>[] = [
    {
      Header: t('individualHarbor.tableHeaders.number') || '',
      accessor: 'number',
    },
    {
      Header: t('individualHarbor.tableHeaders.identifier') || '',
      accessor: 'identifier',
      filter: 'exactText',
    },
    {
      Header: t('individualHarbor.tableHeaders.length') || '',
      accessor: ({ length }) => formatDimension(length, i18n.language),
      id: 'length',
    },
    {
      Header: t('individualHarbor.tableHeaders.width') || '',
      accessor: ({ width }) => formatDimension(width, i18n.language),
      id: 'width',
    },
    {
      Header: t('individualHarbor.tableHeaders.mooring') || '',
      accessor: ({ mooringType }) =>
        t([`common.mooringTypes.${mooringType}`, mooringType]),
      id: 'mooringType',
    },
  ];
  const piers = getPiers(data);
  const berths = getBerths(data);

  return (
    <IndividualHarborPage>
      <HarborProperties
        name={harbor.name || ''}
        imageUrl={harbor.imageFile}
        servicemapId={harbor.servicemapId || ''}
        address={`${harbor.streetAddress} ${harbor.zipCode} ${harbor.municipality}`}
        properties={{
          electricity: harbor.electricity,
          gate: harbor.gate,
          lighting: harbor.lighting,
          maxWidth: harbor.maxWidth || 0,
          numberOfPlaces: harbor.numberOfPlaces || 0,
          numberOfFreePlaces: harbor.numberOfFreePlaces || 0,
          queue: harbor.numberOfPlaces || 0,
          wasteCollection: harbor.wasteCollection,
          water: harbor.water,
        }}
      />
      <Table
        data={berths}
        columns={columns}
        canSelectRows
        renderTableToolsTop={(_, setters) => (
          <GlobalSearchTableTools
            handleGlobalFilter={setters.setGlobalFilter}
          />
        )}
        styleMainHeader={false}
        globalFilter={berthTableGlobalFilter}
        renderMainHeader={props => (
          <PierSelectHeader
            piers={piers}
            selectedPier={piers.find(pier =>
              props.state.filters
                .filter(filter => filter.id === 'identifier')
                .find(filter => filter.value === pier.identifier)
            )}
            onPierSelect={pier => {
              props.setFilter('identifier', pier?.identifier);
            }}
          />
        )}
      />
    </IndividualHarborPage>
  );
};

export default IndividualHarborPageContainer;
