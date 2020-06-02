import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '../../../common/grid/Grid';
import Section from '../../../common/section/Section';
import styles from './customerDetails.module.scss';
import { OrganizationType } from '../../../@types/__generated__/globalTypes';

interface Berth {
  id: string;
  title: string;
}

interface WinterStoragePlaces {
  id: string;
  title: string;
}

interface CustomerListBoat {
  id: string;
  name: string;
}

interface Application {
  id: string;
  date: string;
}

interface Bill {
  id: string;
  date: string;
}

export interface CustomerDetailsProps {
  name: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  berths: Berth[];
  winterStoragePlaces: WinterStoragePlaces[];
  boats: CustomerListBoat[];
  applications: Application[];
  bills: Bill[];
  comment: string;
  organizationType?: OrganizationType;
}

const CustomerDetails: React.SFC<CustomerDetailsProps> = ({
  name,
  address,
  postalCode,
  city,
  phone,
  email,
  berths,
  winterStoragePlaces,
  boats,
  applications,
  bills,
  comment,
  organizationType,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.customerDetails}>
      <Grid colsCount={4}>
        <div className={styles.section}>
          <Section title={t('harborList.details.customer')}>{name}</Section>
          <Section>
            {address}
            <br />
            {postalCode} {city}
          </Section>
          <Section>
            {phone}
            <br />
            {email}
            <br />
            {organizationType ? t([`common.organizationTypes.${organizationType}`]) : t([`common.privateCustomer`])}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harborList.details.berths')}>
            {berths.map((berth) => (
              <div key={berth.id}>{berth.title}</div>
            ))}
          </Section>
          <Section title={t('harborList.details.winterStoragePlaces')}>
            {winterStoragePlaces.map((place) => (
              <div key={place.id}>{place.title}</div>
            ))}
          </Section>
          <Section title={t('harborList.details.boats')}>
            {boats.map((boat) => (
              <div key={boat.id}>{boat.name}</div>
            ))}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harborList.details.applications')}>
            {applications.map((application) => (
              <div key={application.id}>{application.date}</div>
            ))}
          </Section>
          <Section title={t('harborList.details.bills')}>
            {bills.map((bill) => (
              <div key={bill.id}>{bill.date}</div>
            ))}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harborList.details.comments')}>{comment}</Section>
        </div>
      </Grid>
    </div>
  );
};

export default CustomerDetails;
