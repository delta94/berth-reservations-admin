import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customerView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import CustomerProfileCard, { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import Card from '../../common/card/Card';
import CardHeader from '../../common/cardHeader/CardHeader';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationsCard from './applicationsCard/ApplicationsCard';
import BillsCard from './billsCard/BillsCard';
import BillingHistoryCard from './billingHistoryCard/BillingHistoryCard';
import LeasesCard from './leasesCard/LeasesCard';
import BoatsCard from './boatsCard/BoatsCard';
import { Application, Bill, Boat, Lease } from './types';

export interface CustomerViewProps {
  applications: Application[];
  bills: Bill[];
  boats: Boat[];
  customerProfile: CustomerProfileCardProps;
  leases: Lease[];
  openBills: Bill[];
  setBoatToEdit: (boat: Boat | null) => void;
  setOpenBill: (bill: Bill | undefined) => void;
  onClickCreateBoat: () => void;
}

const CustomerView = ({
  applications,
  bills,
  boats,
  customerProfile,
  leases,
  openBills,
  setBoatToEdit,
  setOpenBill,
  onClickCreateBoat,
}: CustomerViewProps) => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <PageTitle title={t('customerView.title')} />
      <div className={styles.grid}>
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

        <BoatsCard boats={boats} onEdit={(boat) => setBoatToEdit(boat)} onCreate={onClickCreateBoat} />
      </div>
    </PageContent>
  );
};

export default CustomerView;
