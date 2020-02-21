import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { OFFER_PAGE_QUERY } from './queries';
import Table, { Column } from '../../common/table/Table';
import OfferPage from './OfferPage';
import InternalLink from '../../common/internalLink/InternalLink';
import { OFFER_PAGE } from './__generated__/OFFER_PAGE';
import { BerthData, getOfferData } from './utils';
import { formatDimension } from '../../common/utils/format';

type ColumnType = Column<BerthData> & { accessor: keyof BerthData };

function useRouterQuery() {
  return new URLSearchParams(useLocation().search);
}

const OfferPageContainer: React.FC = () => {
  const routerQuery = useRouterQuery();
  const { applicationId } = useParams();

  const { loading, error, data } = useQuery<OFFER_PAGE>(OFFER_PAGE_QUERY, {
    variables: { applicationId, servicemapId: routerQuery.get('harbor') },
  });
  const { t, i18n } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/harbors/${cell.row.original.harborId}}`}>
          {cell.value}
        </InternalLink>
      ),
      Header: t('offer.tableHeaders.harbor') || '',
      accessor: 'harbor',
    },
    {
      Header: t('offer.tableHeaders.pier') || '',
      accessor: 'pier',
    },
    {
      Header: t('offer.tableHeaders.berth') || '',
      accessor: 'berth',
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.width') || '',
      accessor: 'width',
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.length') || '',
      accessor: 'length',
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.draught') || '',
      accessor: 'draught',
    },
    {
      Cell: ({ cell }) => t([`common.mooringTypes.${cell.value}`, cell.value]),
      Header: t('offer.tableHeaders.mooringType') || '',
      accessor: 'mooringType',
    },
  ];

  if (error || !data)
    return (
      <LoadingSpinner isLoading={loading}>
        <p>Error</p>
      </LoadingSpinner>
    );

  const tableData = getOfferData(data);

  return (
    <LoadingSpinner isLoading={loading}>
      <OfferPage>
        <Table
          data={tableData}
          columns={columns}
          renderSubComponent={row => 'placeholder'}
          renderMainHeader={() => t('offer.tableHeaders.mainHeader')}
          canSelectOneRow
        />
      </OfferPage>
    </LoadingSpinner>
  );
};

export default OfferPageContainer;
