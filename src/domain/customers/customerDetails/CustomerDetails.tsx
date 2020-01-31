import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '../../../common/grid/Grid';
import Section from '../../../common/section/Section';
import styles from './customerDetails.module.scss';

interface Berth {
  id: string;
  title: string;
}

interface WinterStoragePlaces {
  id: string;
  title: string;
}

interface Boat {
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
  boats: Boat[];
  applications: Application[];
  bills: Bill[];
  comment: string;
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
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.customerDetails}>
      <Grid colsCount={4}>
        <div className={styles.section}>
          <Section title={t('harbors.details.customer')}>{name}</Section>
          <Section>
            {address}
            <br />
            {postalCode} {city}
          </Section>
          <Section>
            {phone}
            <br />
            {email}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harbors.details.berths')}>
            {berths.map(berth => (
              <div key={berth.id}>{berth.title}</div>
            ))}
          </Section>
          <Section title={t('harbors.details.winterStoragePlaces')}>
            {winterStoragePlaces.map(place => (
              <div key={place.id}>{place.title}</div>
            ))}
          </Section>
          <Section title={t('harbors.details.boats')}>
            {boats.map(boat => (
              <div key={boat.id}>{boat.name}</div>
            ))}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harbors.details.applications')}>
            {applications.map(application => (
              <div key={application.id}>{application.date}</div>
            ))}
          </Section>
          <Section title={t('harbors.details.bills')}>
            {bills.map(bill => (
              <div key={bill.id}>{bill.date}</div>
            ))}
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={t('harbors.details.comments')}>{comment}</Section>
        </div>
      </Grid>
    </div>
  );
};

export default CustomerDetails;
