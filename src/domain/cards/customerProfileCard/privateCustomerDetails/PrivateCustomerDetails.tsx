import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../../../../common/section/Section';
import LabelValuePair from '../../../../common/labelValuePair/LabelValuePair';
import InternalLink from '../../../../common/internalLink/InternalLink';
import { CUSTOMER_GROUP } from '../../../types';
import { InvoicingType } from '../../../../@types/__generated__/globalTypes';

export interface PrivateCustomerDetailsProps {
  title?: string;
  comment?: string | null;
  customerId?: string;
  customerGroup: CUSTOMER_GROUP;
  firstName: string;
  invoicingType?: InvoicingType;
  lastName: string;
  organization?: null;
  primaryAddress?: {
    address: string;
    postalCode: string;
    city: string;
  } | null;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  showCustomerNameAsLink?: boolean;
  ssn?: string;
}

const PrivateCustomerDetails: FunctionComponent<PrivateCustomerDetailsProps> = ({
  title,
  comment,
  customerId,
  customerGroup,
  firstName,
  lastName,
  invoicingType,
  primaryAddress,
  primaryEmail,
  primaryPhone,
  showCustomerNameAsLink = false,
  ssn,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Section
        title={title || t('customerProfile.personalInformation').toUpperCase()}
      >
        <LabelValuePair
          label={t('customerProfile.firstName')}
          value={
            showCustomerNameAsLink && customerId ? (
              <InternalLink to={`/customers/${customerId}`}>
                {firstName}
              </InternalLink>
            ) : (
              firstName
            )
          }
        />
        <LabelValuePair
          label={t('customerProfile.lastName')}
          value={
            showCustomerNameAsLink && customerId ? (
              <InternalLink to={`/customers/${customerId}`}>
                {lastName}
              </InternalLink>
            ) : (
              lastName
            )
          }
        />
        <LabelValuePair
          label={t('customerProfile.ssn')}
          value={
            showCustomerNameAsLink && customerId ? (
              <InternalLink to={`/customers/${customerId}`}>{ssn}</InternalLink>
            ) : (
              ssn
            )
          }
        />
      </Section>
      <Section>
        <LabelValuePair
          label={t('customerProfile.address')}
          value={primaryAddress?.address}
        />
        <LabelValuePair
          label={t('customerProfile.postalCode')}
          value={primaryAddress?.postalCode}
        />
        <LabelValuePair
          label={t('customerProfile.city')}
          value={primaryAddress?.city}
        />
      </Section>
      <Section>
        <LabelValuePair
          label={t('customerProfile.phone')}
          value={primaryPhone}
        />
        <LabelValuePair
          label={t('customerProfile.email')}
          value={primaryEmail}
        />
      </Section>
      <Section>
        <LabelValuePair
          label={t('customerProfile.customerGroup')}
          value={t([`common.customerGroups.${customerGroup}`])}
        />
        {invoicingType && (
          <LabelValuePair
            value={t([`common.invoicingTypes.${invoicingType}`])}
          />
        )}
      </Section>
      {comment && (
        <Section>
          <LabelValuePair
            label={t('customerProfile.remarks')}
            value={comment}
          />
        </Section>
      )}
    </>
  );
};

export default PrivateCustomerDetails;
