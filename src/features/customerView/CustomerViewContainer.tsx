import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';

import CustomerView from './CustomerView';
import { INDIVIDUAL_CUSTOMER_QUERY } from './queries';
import { INDIVIDUAL_CUSTOMER } from './__generated__/INDIVIDUAL_CUSTOMER';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { getLeases, getBoats, getApplications, getCustomerProfile, getBills } from './utils';
import { Bill, Boat } from './types';
import { OrderStatus } from '../../@types/__generated__/globalTypes';
import Modal from '../../common/modal/Modal';
import BoatEditForm from './forms/boatForm/BoatEditForm';
import BillModal from './billModal/BillModal';
import BoatCreateForm from './forms/boatForm/BoatCreateForm';

const CustomerViewContainer = () => {
  const [boatToEdit, setBoatToEdit] = useState<Boat | null>();
  const [creatingBoat, setCreatingBoat] = useState<boolean>(false);
  const [openBill, setOpenBill] = useState<Bill>();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_CUSTOMER>(INDIVIDUAL_CUSTOMER_QUERY, { variables: { id } });

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (!data?.profile || !data?.boatTypes)
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

  const applications = getApplications(data.profile, data.boatTypes || []);
  const bills = getBills(data.profile);
  const boats = getBoats(data.profile);
  const { boatTypes } = data;
  const customerProfile = getCustomerProfile(data.profile);
  const leases = getLeases(data.profile);
  const openBills = bills.filter((bill) => bill.status === OrderStatus.WAITING);

  return (
    <>
      <CustomerView
        applications={applications}
        bills={bills}
        boats={boats}
        customerProfile={customerProfile}
        leases={leases}
        openBills={openBills}
        setBoatToEdit={setBoatToEdit}
        setOpenBill={setOpenBill}
        onClickCreateBoat={() => setCreatingBoat(true)}
      />

      {boatToEdit && (
        <Modal isOpen={true} toggleModal={() => setBoatToEdit(null)}>
          <BoatEditForm
            boatTypes={boatTypes}
            initialValues={boatToEdit}
            onCancel={() => setBoatToEdit(null)}
            onDelete={() => setBoatToEdit(null)}
            onSubmit={() => setBoatToEdit(null)}
            refetchQueries={[{ query: INDIVIDUAL_CUSTOMER_QUERY, variables: { id } }]}
          />
        </Modal>
      )}

      <Modal isOpen={creatingBoat} toggleModal={() => setCreatingBoat(false)}>
        <BoatCreateForm
          ownerId={data.profile.id}
          boatTypes={boatTypes}
          onCancel={() => setCreatingBoat(false)}
          onSubmit={() => setCreatingBoat(false)}
          refetchQueries={[{ query: INDIVIDUAL_CUSTOMER_QUERY, variables: { id } }]}
        />
      </Modal>

      <BillModal bill={openBill} toggleModal={() => setOpenBill(undefined)} />
    </>
  );
};

export default CustomerViewContainer;
