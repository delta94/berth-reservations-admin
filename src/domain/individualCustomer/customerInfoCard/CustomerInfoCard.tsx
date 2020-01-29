import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Section from '../../../common/section/Section';

export interface CustomerInfoCardProps {
  firstName: string;
  lastName: string;
  primaryAddress?: {
    address: string;
    postalCode: string;
    city: string;
  } | null;
  phone?: string | null;
  email?: string | null;
  comment?: string | null;
}

const CustomerInfoCard: React.SFC<CustomerInfoCardProps> = ({
  firstName,
  lastName,
  primaryAddress,
  phone,
  email,
  comment,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('individualCustomer.customerInformation.title')} />
      <CardBody>
        <Section
          title={t(
            'individualCustomer.customerInformation.applicantPersonalInfo'
          )}
        >
          <LabelValuePair
            label={t('individualCustomer.customerInformation.firstName')}
            value={firstName}
          />
          <LabelValuePair
            label={t('individualCustomer.customerInformation.lastName')}
            value={lastName}
          />
        </Section>
        <Section>
          <LabelValuePair
            label={t('individualCustomer.customerInformation.address')}
            value={primaryAddress?.address}
          />
          <LabelValuePair
            label={t('individualCustomer.customerInformation.postalCode')}
            value={primaryAddress?.postalCode}
          />
          <LabelValuePair
            label={t('individualCustomer.customerInformation.city')}
            value={primaryAddress?.city}
          />
        </Section>
        <Section>
          <LabelValuePair
            label={t('individualCustomer.customerInformation.phone')}
            value={phone}
          />
          <LabelValuePair
            label={t('individualCustomer.customerInformation.email')}
            value={email}
          />
        </Section>
        <Section>
          <LabelValuePair
            label={t('individualCustomer.customerInformation.remarks')}
            value={comment}
          />
        </Section>
      </CardBody>
    </Card>
  );
};

export default CustomerInfoCard;
