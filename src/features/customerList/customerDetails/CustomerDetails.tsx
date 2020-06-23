import React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '../../../common/grid/Grid';
import Section from '../../../common/section/Section';
import { OrganizationType } from '../../../@types/__generated__/globalTypes';
import {
  CustomerListApplication,
  CustomerListBerthLeases,
  CustomerListBill,
  CustomerListBoat,
  CustomerListWinterStoragePlaces,
} from '../types';
import { formatDate } from '../../../common/utils/format';

export interface CustomerDetailsProps {
  name: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  berths: CustomerListBerthLeases[];
  winterStoragePlaces: CustomerListWinterStoragePlaces[];
  boats: CustomerListBoat[];
  applications: CustomerListApplication[];
  bills: CustomerListBill[];
  comment: string | null;
  organizationType?: OrganizationType;
}

const CustomerDetails = ({
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
}: CustomerDetailsProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Grid colsCount={4}>
        <div>
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
        <div>
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
        <div>
          <Section title={t('harborList.details.applications')}>
            {applications.map((application) => (
              <div key={application.id}>{formatDate(application.createdAt, i18n.language)}</div>
            ))}
          </Section>
          <Section title={t('harborList.details.bills')}>
            {bills.map((bill) => (
              <div key={bill.id}>{bill.date}</div>
            ))}
          </Section>
        </div>
        <div>
          <Section title={t('harborList.details.comments')}>{comment}</Section>
        </div>
      </Grid>
    </div>
  );
};

export default CustomerDetails;
