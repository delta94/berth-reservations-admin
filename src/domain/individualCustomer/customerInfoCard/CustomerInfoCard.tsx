import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import LabelValuePair from '../../../common/labelValuePair/LabelValuePair';
import Paragraph from '../../../common/paragraph/Paragraph';

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
    <Card title={t('individualCustomer.customerInformation.title')}>
      <Paragraph
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
      </Paragraph>
      <Paragraph>
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
      </Paragraph>
      <Paragraph>
        <LabelValuePair
          label={t('individualCustomer.customerInformation.phone')}
          value={phone}
        />
        <LabelValuePair
          label={t('individualCustomer.customerInformation.email')}
          value={email}
        />
      </Paragraph>
      <Paragraph>
        <LabelValuePair
          label={t('individualCustomer.customerInformation.remarks')}
          value={comment}
        />
      </Paragraph>
    </Card>
  );
};

export default CustomerInfoCard;
