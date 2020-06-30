import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import InternalLink from '../internalLink/InternalLink';
import { InvoicingType, Language } from '../../@types/__generated__/globalTypes';

export interface PrivateCustomerDetailsProps {
  title?: string;
  comment?: string | null;
  customerId?: string;
  firstName: string;
  invoicingType?: InvoicingType;
  lastName: string;
  primaryAddress?: {
    address: string;
    postalCode: string;
    city: string;
  } | null;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  language: Language | null;
  showCustomerNameAsLink?: boolean;
  ssn?: string;
}

const PrivateCustomerDetails = ({
  title,
  comment,
  customerId,
  firstName,
  lastName,
  invoicingType,
  primaryAddress,
  primaryEmail,
  primaryPhone,
  language,
  showCustomerNameAsLink = false,
  ssn,
}: PrivateCustomerDetailsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Section title={title || t('customerProfile.personalInformation').toUpperCase()}>
        <LabelValuePair
          label={t('customerProfile.firstName')}
          value={
            showCustomerNameAsLink && customerId ? (
              <InternalLink to={`/customers/${customerId}`}>{firstName}</InternalLink>
            ) : (
              firstName
            )
          }
        />
        <LabelValuePair
          label={t('customerProfile.lastName')}
          value={
            showCustomerNameAsLink && customerId ? (
              <InternalLink to={`/customers/${customerId}`}>{lastName}</InternalLink>
            ) : (
              lastName
            )
          }
        />
        {ssn && (
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
        )}
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.address')} value={primaryAddress?.address} />
        <LabelValuePair label={t('customerProfile.postalCode')} value={primaryAddress?.postalCode} />
        <LabelValuePair label={t('customerProfile.city')} value={primaryAddress?.city} />
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.phone')} value={primaryPhone} />
        <LabelValuePair label={t('customerProfile.email')} value={primaryEmail} />
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.customerGroup')} value={t([`common.privateCustomer`])} />
        {language && (
          <LabelValuePair label={t('customerProfile.language')} value={t([`common.languages.${language}`])} />
        )}
        {invoicingType && <LabelValuePair value={t([`common.invoicingTypes.${invoicingType}`])} />}
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.remarks')} value={comment} />
      </Section>
    </>
  );
};

export default PrivateCustomerDetails;
