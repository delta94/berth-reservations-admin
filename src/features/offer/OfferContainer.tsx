import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Notification } from 'hds-react';
import { getOperationName } from 'apollo-link';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { OFFER_QUERY } from './queries';
import Offer from './Offer';
import { OFFER } from './__generated__/OFFER';
import { getOfferData, getAllPiersIdentifiers, getBoat, getHarbor } from './utils';
import { formatDate } from '../../common/utils/format';
import { CREATE_LEASE_MUTATION } from './mutations';
import { CREATE_LEASE, CREATE_LEASEVariables as CREATE_LEASE_VARS } from './__generated__/CREATE_LEASE';
import { BERTH_APPLICATIONS_QUERY } from '../applicationList/queries';

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

  const handleClickSelect = (berthId: string) => {
    createBerthLease({
      variables: {
        input: {
          applicationId: applicationId || '',
          berthId,
        },
      },
    }).then(() => history.push('/applications'));
  };

  return (
    <Offer
      applicationDate={applicationDate}
      applicationStatus={applicationStatus}
      applicationType={applicationType}
      boat={boat}
      handleClickSelect={handleClickSelect}
      handleReturn={handleReturn}
      harbor={harbor}
      isSubmitting={isSubmitting}
      piersIdentifiers={piersIdentifiers}
      tableData={tableData}
    />
  );
};

export default OfferContainer;
