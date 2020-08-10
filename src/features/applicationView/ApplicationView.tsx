import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { PureQueryOptions } from 'apollo-client';

import styles from './applicationView.module.scss';
import Card from '../../common/card/Card';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationDetails, { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import CardHeader from '../../common/cardHeader/CardHeader';
import Text from '../../common/text/Text';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import CustomerProfileCard, { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import OfferCard, { OfferCardProps } from './offerCard/OfferCard';
import { CustomerGroup } from '../../@types/__generated__/globalTypes';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import LinkApplicationToCustomerContainer, {
  LinkApplicationToCustomerContainerProps,
} from '../linkApplicationToCustomer/LinkApplicationToCustomerContainer';

export enum SearchBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  ADDRESS = 'address',
}

export interface CustomerData {
  id: string;
  name: string;
  city?: string;
  address?: string;
  berths?: string | null;
  customerGroup: CustomerGroup | null;
}

export interface ApplicationViewProps {
  applicationDetails: ApplicationDetailsProps;
  berthApplication: LinkApplicationToCustomerContainerProps['berthApplication'];
  customerProfile: CustomerProfileCardProps | null;
  leaseDetails: OfferCardProps['leaseDetails'] | null;
  refetchQueries: PureQueryOptions[] | string[];
  handleDeleteLease(id: string): void;
}

const ApplicationView = ({
  applicationDetails,
  berthApplication,
  customerProfile,
  leaseDetails,
  refetchQueries,
  handleDeleteLease,
}: ApplicationViewProps) => {
  const { t, i18n } = useTranslation();

  return (
    <PageContent className={styles.applicationView}>
      <PageTitle title={t('applicationView.title')} />

      <div className={classNames(styles.fullWidth, styles.pageHeader)}>
        <Text as="h2" size="xl" weight="normalWeight">
          {applicationDetails.berthSwitch !== null
            ? t('applicationList.applicationType.switchApplication')
            : t('applicationList.applicationType.newApplication')}{' '}
          {formatDate(applicationDetails.createdAt, i18n.language)}
        </Text>
        <Chip
          className={styles.chip}
          color={APPLICATION_STATUS[applicationDetails.status].color}
          label={t(APPLICATION_STATUS[applicationDetails.status].label)}
        />
      </div>

      {customerProfile ? (
        <>
          <CustomerProfileCard {...customerProfile} />
          <ActionHistoryCard />
        </>
      ) : (
        <LinkApplicationToCustomerContainer berthApplication={berthApplication} />
      )}

      <Card className={styles.fullWidth}>
        <CardHeader title={t('applicationView.applicationDetails.title')} />
        <CardBody>
          <ApplicationDetails {...applicationDetails} handleDeleteLease={handleDeleteLease} queue={null} />
        </CardBody>
      </Card>

      {leaseDetails && (
        <OfferCard leaseDetails={leaseDetails} handleDeleteLease={handleDeleteLease} refetchQueries={refetchQueries} />
      )}
    </PageContent>
  );
};

export default ApplicationView;
