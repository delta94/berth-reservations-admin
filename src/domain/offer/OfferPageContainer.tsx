import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useHistory, Redirect } from 'react-router';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { OFFER_PAGE_QUERY } from './queries';
import Table, { Column } from '../../common/table/Table';
import OfferPage from './OfferPage';
import InternalLink from '../../common/internalLink/InternalLink';
import { OFFER_PAGE } from './__generated__/OFFER_PAGE';
import { BerthData, getOfferData } from './utils';
import { formatDimension, formatDate } from '../../common/utils/format';
import { CREATE_LEASE_MUTATION } from './mutations';
import { CREATE_LEASE } from './__generated__/CREATE_LEASE';
import { CreateBerthLeaseMutationInput } from '../../../__generated__/globalTypes';
import TableTools from './tableTools/TableTools';

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
  const [
    createBerthLease,
    { data: mutationData, loading: isSubmitting },
  ] = useMutation<
    { CREATE_LEASE: CREATE_LEASE },
    { input: CreateBerthLeaseMutationInput }
  >(CREATE_LEASE_MUTATION);
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

  if (error || !data?.berthApplication)
    return (
      <LoadingSpinner isLoading={loading}>
        <p>Error</p>
      </LoadingSpinner>
    );

  if (mutationData) {
    return <Redirect to="/applications" />;
  }

  const tableData = getOfferData(data);

  const getApplicationType = (isSwitch: boolean) =>
    isSwitch
      ? t('applications.applicationType.switchApplication')
      : t('applications.applicationType.newApplication');

  const applicationDate = formatDate(
    data.berthApplication?.createdAt,
    i18n.language
  );
  const applicationStatus = data.berthApplication.status;
  const handleReturn = () => history.push('/applications');
  const applicationType = getApplicationType(
    !!data.berthApplication.berthSwitch
  );

  return (
    <LoadingSpinner isLoading={loading}>
      <OfferPage>
        <Table
          data={tableData}
          columns={columns}
          renderSubComponent={row => 'placeholder'}
          renderMainHeader={() => t('offer.tableHeaders.mainHeader')}
          renderTableTools={state => {
            const berthId = state.selectedRows[0]?.berthId;
            const isDisabled =
              isSubmitting ||
              !applicationId ||
              !berthId ||
              !data.berthApplication?.customer;

            const handleSubmit = () => {
              createBerthLease({
                variables: {
                  input: {
                    applicationId: applicationId || '',
                    berthId,
                  },
                },
              });
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
    </LoadingSpinner>
  );
};

export default OfferPageContainer;
