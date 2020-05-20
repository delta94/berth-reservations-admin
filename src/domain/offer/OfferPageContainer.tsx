import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Notification } from 'hds-react';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { OFFER_PAGE_QUERY } from './queries';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import OfferPage from './OfferPage';
import InternalLink from '../../common/internalLink/InternalLink';
import { OFFER_PAGE } from './__generated__/OFFER_PAGE';
import { BerthData, getOfferData, getAllPiersIdentifiers } from './utils';
import { formatDimension, formatDate } from '../../common/utils/format';
import { CREATE_LEASE_MUTATION } from './mutations';
import { CREATE_LEASE, CREATE_LEASEVariables as CREATE_LEASE_VARS } from './__generated__/CREATE_LEASE';
import TableTools from './tableTools/TableTools';
import BerthDetails from '../cards/berthDetails/BerthDetails';
import TableFilters from '../../common/tableFilters/TableFilters';

type ColumnType = Column<BerthData> & { accessor: keyof BerthData };

function useRouterQuery() {
  return new URLSearchParams(useLocation().search);
}

const OfferPageContainer: React.FC = () => {
  const routerQuery = useRouterQuery();
  const { applicationId } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery<OFFER_PAGE>(OFFER_PAGE_QUERY, {
    variables: { applicationId, servicemapId: routerQuery.get('harbor') },
  });
  const [createBerthLease, { loading: isSubmitting }] = useMutation<CREATE_LEASE, CREATE_LEASE_VARS>(
    CREATE_LEASE_MUTATION,
    {
      refetchQueries: ['BERTH_APPLICATIONS'],
    }
  );
  const { t, i18n } = useTranslation();

  const columns: ColumnType[] = [
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
    isSwitch ? t('applications.applicationType.switchApplication') : t('applications.applicationType.newApplication');

  const applicationDate = formatDate(data.berthApplication?.createdAt, i18n.language);
  const applicationStatus = data.berthApplication.status;
  const handleReturn = () => history.push('/applications');
  const applicationType = getApplicationType(!!data.berthApplication.berthSwitch);
  const piersIdentifiers = getAllPiersIdentifiers(data);

  return (
    <OfferPage>
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
        renderTableToolsTop={(state) => {
          const berthId = state.selectedRows[0]?.berthId;
          const isDisabled = isSubmitting || !applicationId || !berthId || !data.berthApplication?.customer;

          const handleSubmit = () => {
            createBerthLease({
              refetchQueries: ['BERTH_APPLICATIONS'],
              variables: {
                input: {
                  applicationId: applicationId || '',
                  berthId,
                },
              },
            }).catch((error) => console.error(error)); // TODO: handle errors

            history.push('/applications');
          };

          return (
            <TableTools
              applicationDate={applicationDate}
              applicationType={applicationType}
              applicationStatus={applicationStatus}
              disableSubmit={isDisabled}
              handleSubmit={handleSubmit}
              handleReturn={handleReturn}
            />
          );
        }}
        canSelectOneRow
      />
    </OfferPage>
  );
};

export default OfferPageContainer;
