import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Notification, Button } from 'hds-react';
import { getOperationName } from 'apollo-link';

import styles from './offer.module.scss';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { OFFER_QUERY } from './queries';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import Offer from './Offer';
import InternalLink from '../../common/internalLink/InternalLink';
import { OFFER } from './__generated__/OFFER';
import { BerthData, getOfferData, getAllPiersIdentifiers, getBoat, getHarbor } from './utils';
import { formatDimension, formatDate } from '../../common/utils/format';
import { CREATE_LEASE_MUTATION } from './mutations';
import { CREATE_LEASE, CREATE_LEASEVariables as CREATE_LEASE_VARS } from './__generated__/CREATE_LEASE';
import TableTools from './tableTools/TableTools';
import BerthDetails from '../../common/berthDetails/BerthDetails';
import TableFilters from '../../common/tableFilters/TableFilters';
import { BERTH_APPLICATIONS_QUERY } from '../applicationList/queries';
import HarborCard from '../../common/harborCard/HarborCard';
import BoatCard from '../../common/boatCard/BoatCard';

type ColumnType = Column<BerthData> & { accessor: keyof BerthData };

function useRouterQuery() {
  return new URLSearchParams(useLocation().search);
}

const OfferContainer = () => {
  const routerQuery = useRouterQuery();
  const { applicationId } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery<OFFER>(OFFER_QUERY, {
    variables: { applicationId, servicemapId: routerQuery.get('harbor') },
  });
  const [createBerthLease, { loading: isSubmitting }] = useMutation<CREATE_LEASE, CREATE_LEASE_VARS>(
    CREATE_LEASE_MUTATION,
    {
      refetchQueries: [getOperationName(BERTH_APPLICATIONS_QUERY) || 'BERTH_APPLICATIONS'],
    }
  );
  const { t, i18n } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ row }) => (
        <Button
          theme="coat"
          onClick={() => {
            createBerthLease({
              variables: {
                input: {
                  applicationId: applicationId || '',
                  berthId: row.original.berthId,
                },
              },
            });

            history.push('/applications');
          }}
          disabled={isSubmitting}
        >
          {t('offer.tableCells.select')}
        </Button>
      ),
      Header: t('offer.tableHeaders.selection') || '',
      accessor: 'berthId',
      width: COLUMN_WIDTH.S,
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Cell: ({ cell }) => <InternalLink to={`/harbors/${cell.row.original.harborId}}`}>{cell.value}</InternalLink>,
      Header: t('offer.tableHeaders.harbor') || '',
      accessor: 'harbor',
      width: COLUMN_WIDTH.XL,
    },
    {
      Header: t('offer.tableHeaders.pier') || '',
      accessor: 'pier',
      filter: 'exactText',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('offer.tableHeaders.berth') || '',
      accessor: 'berth',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.width') || '',
      accessor: 'width',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.length') || '',
      accessor: 'length',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.draught') || '',
      accessor: 'draught',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => t([`common.mooringTypes.${cell.value}`, cell.value]),
      Header: t('offer.tableHeaders.mooringType') || '',
      accessor: 'mooringType',
      width: COLUMN_WIDTH.S,
    },
  ];

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (!data?.berthApplication)
    return (
      <Notification labelText={t('common.notification.noData.label')}>
        {t('common.notification.noData.description')}
      </Notification>
    );
  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  const tableData = getOfferData(data);

  const getApplicationType = (isSwitch: boolean) =>
    isSwitch
      ? t('applicationList.applicationType.switchApplication')
      : t('applicationList.applicationType.newApplication');

  const applicationDate = formatDate(data.berthApplication?.createdAt, i18n.language);
  const applicationStatus = data.berthApplication.status;
  const handleReturn = () => history.push('/applications');
  const applicationType = getApplicationType(!!data.berthApplication.berthSwitch);
  const piersIdentifiers = getAllPiersIdentifiers(data);
  const harbor = getHarbor(data);
  const boat = getBoat(data);

  return (
    <Offer>
      {harbor && <HarborCard {...harbor} className={styles.card} />}
      {boat && <BoatCard boat={boat} />}
      <Table
        data={tableData}
        columns={columns}
        renderSubComponent={(row) => {
          const { properties, leases, comment } = row.original;
          return <BerthDetails leases={leases} comment={comment} {...properties} />;
        }}
        renderMainHeader={(props) => (
          <TableFilters
            activeFilters={props.state.filters.map((filter) => filter.value)}
            filters={piersIdentifiers}
            handleSetFilter={(filter) => props.setFilter('pier', filter)}
            filterPrefix={t('offer.tableHeaders.pierFilterBtn')}
          />
        )}
        renderTableToolsTop={() => (
          <TableTools
            applicationDate={applicationDate}
            applicationType={applicationType}
            applicationStatus={applicationStatus}
            handleReturn={handleReturn}
          />
        )}
      />
    </Offer>
  );
};

export default OfferContainer;
