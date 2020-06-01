import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../card/Card';
import CardHeader from '../cardHeader/CardHeader';
import CardBody from '../cardBody/CardBody';
import PrivateCustomerDetails, { PrivateCustomerDetailsProps } from './privateCustomerDetails/PrivateCustomerDetails';
import OrganizationCustomerDetails, {
  OrganizationCustomerDetailsProps,
} from './organizationCustomerDetails/OrganizationCustomerDetails';

export type CustomerProfileCardProps = {
  className?: string;
} & (PrivateCustomerDetailsProps | OrganizationCustomerDetailsProps);

const renderDetails = (props: CustomerProfileCardProps) => {
  if ('organization' in props && props.organization !== null) {
    return <OrganizationCustomerDetails {...props} />;
  } else {
    return <PrivateCustomerDetails {...props} />;
  }
};

const CustomerProfileCard: FunctionComponent<CustomerProfileCardProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Card className={className}>
      <CardHeader title={t('customerProfile.title').toUpperCase()} />
      <CardBody>{renderDetails(props)}</CardBody>
    </Card>
  );
};

export default CustomerProfileCard;
