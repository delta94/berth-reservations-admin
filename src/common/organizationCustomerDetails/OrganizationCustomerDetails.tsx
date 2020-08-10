import React from 'react';
import { useTranslation } from 'react-i18next';

import Section from '../section/Section';
import LabelValuePair from '../labelValuePair/LabelValuePair';
import InternalLink from '../internalLink/InternalLink';
import { CustomerGroup, InvoicingType, Language } from '../../@types/__generated__/globalTypes';
import { getCustomerGroupKey } from '../utils/translations';

export interface OrganizationCustomerDetailsProps {
  title?: string;
  comment?: string | null;
  customerId?: string;
  firstName: string;
  invoicingType?: InvoicingType;
  lastName: string;
  organization: {
    address: string;
    businessId: string;
    city: string;
    name: string;
    postalCode: string;
  };
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
  customerGroup: CustomerGroup | null;
}

const OrganizationCustomerDetails = ({
  title,
  comment,
  customerId,
  firstName,
  invoicingType,
  lastName,
  organization,
  primaryEmail,
  primaryPhone,
  language,
  showCustomerNameAsLink = false,
  ssn,
  customerGroup,
}: OrganizationCustomerDetailsProps) => {
  const { t } = useTranslation();
  const customerGroupKey = getCustomerGroupKey(customerGroup);

  return (
    <>
      <Section title={title || t('customerProfile.organization').toUpperCase()}>
        <LabelValuePair label={t('customerProfile.name')} value={organization.name} />{' '}
        <LabelValuePair label={t('customerProfile.businessId')} value={organization.businessId} />
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.address')} value={organization.address} />
        <LabelValuePair label={t('customerProfile.postalCode')} value={organization.postalCode} />
        <LabelValuePair label={t('customerProfile.city')} value={organization.city} />
      </Section>
      <Section>
        <LabelValuePair label={t('customerProfile.customerGroup')} value={t(customerGroupKey)} />
      </Section>
      <Section title={t('customerProfile.contactPerson').toUpperCase()}>
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
        <LabelValuePair label={t('customerProfile.phone')} value={primaryPhone} />
        <LabelValuePair label={t('customerProfile.email')} value={primaryEmail} />
      </Section>
      {(language || invoicingType) && (
        <Section>
          {language && (
            <LabelValuePair label={t('customerProfile.language')} value={t([`common.languages.${language}`])} />
          )}
          {invoicingType && <LabelValuePair value={t([`common.invoicingTypes.${invoicingType}`])} />}
        </Section>
      )}
      <Section>
        <LabelValuePair label={t('customerProfile.remarks')} value={comment} />
      </Section>
    </>
  );
};

export default OrganizationCustomerDetails;
