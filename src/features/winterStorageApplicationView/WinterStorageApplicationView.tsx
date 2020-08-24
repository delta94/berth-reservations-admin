import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './winterStorageApplicationView.module.scss';
import Card from '../../common/card/Card';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationDetails, { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import CardHeader from '../../common/cardHeader/CardHeader';
import Text from '../../common/text/Text';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import CustomerProfileCard, { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import LinkApplicationToCustomerContainer, {
  LinkApplicationToCustomerContainerProps,
} from '../linkApplicationToCustomer/LinkApplicationToCustomerContainer';

export interface ApplicationViewProps {
  customerProfile: CustomerProfileCardProps | null;
  applicationDetails: ApplicationDetailsProps;
  winterStorageApplication: LinkApplicationToCustomerContainerProps['application'];
  handleLinkCustomer(customerId: string): void;
  handleDeleteLease(id: string): void;
}

const WinterStorageApplicationView = ({
  customerProfile,
  applicationDetails,
  winterStorageApplication,
  handleLinkCustomer,
  handleDeleteLease,
}: ApplicationViewProps) => {
  const { t, i18n } = useTranslation();

  return (
    <PageContent className={styles.applicationView}>
      <PageTitle title={t('applicationView.winterStorageTitle')} />
      <div className={classNames(styles.fullWidth, styles.pageHeader)}>
        <Text as="h2" size="xl" weight="normalWeight">
          {t('applicationList.applicationType.newApplication')}{' '}
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
        <LinkApplicationToCustomerContainer
          application={winterStorageApplication}
          handleLinkCustomer={handleLinkCustomer}
        />
      )}

      {applicationDetails && (
        <Card className={styles.fullWidth}>
          <CardHeader title={t('applicationView.applicationDetails.title')} />
          <CardBody>
            <ApplicationDetails {...applicationDetails} handleDeleteLease={handleDeleteLease} queue={null} />
          </CardBody>
        </Card>
      )}
    </PageContent>
  );
};

export default WinterStorageApplicationView;
