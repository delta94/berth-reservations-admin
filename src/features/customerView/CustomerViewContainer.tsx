import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';

import CustomerView from './CustomerView';
import { INDIVIDUAL_CUSTOMER_QUERY } from './queries';
import { INDIVIDUAL_CUSTOMER } from './__generated__/INDIVIDUAL_CUSTOMER';
import Card from '../../common/card/Card';
import CardHeader from '../../common/cardHeader/CardHeader';
import CardBody from '../../common/cardBody/CardBody';
import BillsCard from './billsCard/BillsCard';
import CustomerProfileCard from '../../common/customerProfileCard/CustomerProfileCard';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import ApplicationsCard from './applicationsCard/ApplicationsCard';
import BoatsCard from './boatsCard/BoatsCard';
import LeasesCard from './leasesCard/LeasesCard';
import { getLeases, getBoats, getApplications, getCustomerProfile, getBills, Bill } from './utils';
import Modal from '../../common/modal/Modal';
import BoatEditForm from './forms/boatForm/BoatEditForm';
import { Boat } from './types';
import BillingHistoryCard from './billingHistoryCard/BillingHistoryCard';
import { OrderStatus } from '../../@types/__generated__/globalTypes';
import BillModal from './billModal/BillModal';

const CustomerViewContainer = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_CUSTOMER>(INDIVIDUAL_CUSTOMER_QUERY, { variables: { id } });
  const [boatToEdit, setBoatToEdit] = useState<Boat>();
  const [openBill, setOpenBill] = useState<Bill>();

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

  const customerProfile = getCustomerProfile(data.profile);
  const leases = getLeases(data.profile);
  const boats = getBoats(data.profile);
  const applications = getApplications(data.profile, data.boatTypes || []);
  const bills = getBills(data.profile);
  const openBills = bills.filter((bill) => bill.status === OrderStatus.WAITING);

  return (
    <CustomerView>
      <CustomerProfileCard {...customerProfile} />
      <Card>
        <CardHeader title="VIIMEAIKAINEN TOIMINTA" />
        <CardBody>Placeholder</CardBody>
      </Card>
      <ApplicationsCard applications={applications} />
      <BillsCard bills={openBills} handleShowBill={(bill) => setOpenBill(bill)} />
      <BillingHistoryCard bills={bills} onClick={(bill) => setOpenBill(bill)} />
      <LeasesCard handleShowContract={(id) => alert(`Here's your contract for ${id}`)} leases={leases} />
      <Card>
        <CardHeader title="TALVISÄILYTYSPAIKAT" />
        <CardBody>Placeholder</CardBody>
      </Card>
      <BoatsCard boats={boats} onEdit={(boat) => setBoatToEdit(boat)} />
      <Modal isOpen={!!boatToEdit} toggleModal={() => setBoatToEdit(undefined)}>
        <BoatEditForm
          boatTypes={data.boatTypes}
          initialValues={boatToEdit}
          onCancel={() => setBoatToEdit(undefined)}
          onDelete={() => setBoatToEdit(undefined)}
          onSubmit={() => setBoatToEdit(undefined)}
        />
      </Modal>
      <BillModal bill={openBill} toggleModal={() => setOpenBill(undefined)} />
    </CustomerView>
  );
};

export default CustomerViewContainer;
