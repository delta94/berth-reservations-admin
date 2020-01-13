import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import IndividualCustomerPage from './individualCustomerPage/IndividualCustomerPage';
import { INDIVIDUAL_CUSTOMER_QUERY } from './queries';
import { INDIVIDUAL_CUSTOMER } from './__generated__/INDIVIDUAL_CUSTOMER';
import Card from '../../common/card/Card';
import Paragraph from '../../common/paragraph/Paragraph';
import LabelValuePair from '../../common/labelValuePair/LabelValuePair';
import Text from '../../common/text/Text';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_CUSTOMER>(
    INDIVIDUAL_CUSTOMER_QUERY,
    { variables: { id } }
  );
  const { t } = useTranslation();

  if (loading)
    return (
      <IndividualCustomerPage>
        <p>Loading...</p>
      </IndividualCustomerPage>
    );
  if (error || !data?.profile)
    return (
      <IndividualCustomerPage>
        <p>Error</p>
      </IndividualCustomerPage>
    );

  const {
    firstName,
    lastName,
    primaryAddress,
    primaryPhone,
    primaryEmail,
    comment,
  } = data.profile;

  return (
    <IndividualCustomerPage>
      <Card title={t('individualCustomer.customerInformation.title')}>
        <Text as="h4" size="m">
          {t('individualCustomer.customerInformation.applicantPersonalInfo')}
        </Text>
        <Paragraph>
          <LabelValuePair
            label={t('individualCustomer.customerInformation.firstNames')}
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
            value={primaryPhone?.phone}
          />
          <LabelValuePair
            label={t('individualCustomer.customerInformation.email')}
            value={primaryEmail?.email}
          />
        </Paragraph>
        <Paragraph>
          <LabelValuePair
            label={t('individualCustomer.customerInformation.remarks')}
            value={comment}
          />
        </Paragraph>
      </Card>
    </IndividualCustomerPage>
  );
};

export default IndividualHarborPageContainer;
