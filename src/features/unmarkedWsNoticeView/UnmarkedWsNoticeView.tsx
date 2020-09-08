import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './unmarkedWsNoticeView.module.scss';
import Card from '../../common/card/Card';
import CardBody from '../../common/cardBody/CardBody';
import ApplicationDetails, { ApplicationDetailsProps } from '../../common/applicationDetails/ApplicationDetails';
import CardHeader from '../../common/cardHeader/CardHeader';
import { CustomerProfileCardProps } from '../../common/customerProfileCard/CustomerProfileCard';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import LinkApplicationToCustomerContainer, {
  LinkApplicationToCustomerContainerProps,
} from '../linkApplicationToCustomer/LinkApplicationToCustomerContainer';
import Button from '../../common/button/Button';
import UnmarkedWsNoticeDetails, { UnmarkedWsNoticeDetailsProps } from '../../common/unmarkedWsNoticeDetails/UnmarkedWsNoticeDetails';

export interface ApplicationViewProps {
  customerProfile: CustomerProfileCardProps | null;
  applicationDetails: UnmarkedWsNoticeDetailsProps;
  winterStorageApplication: LinkApplicationToCustomerContainerProps['application'];
  handleLinkCustomer(customerId: string): void;
  handleDeleteLease(id: string): void;
}

const UnmarkedWsNoticeView = ({
  customerProfile,
  applicationDetails,
  winterStorageApplication,
  handleLinkCustomer,
  handleDeleteLease,
}: ApplicationViewProps) => {
  const { t } = useTranslation();

  return (
    <PageContent className={styles.applicationView}>
      <div className={styles.fullWidth}>
        <PageTitle title={t('unmarkedWsNoticeView.title')} />
      </div>

      {!customerProfile && (
        <LinkApplicationToCustomerContainer
          application={winterStorageApplication}
          handleLinkCustomer={handleLinkCustomer}
        />
      )}

      <Button>Poista ilmoitus</Button>

      {applicationDetails && (
        <Card className={styles.fullWidth}>
          <CardHeader title={t('applicationView.applicationDetails.title')} />
          <CardBody>
            <UnmarkedWsNoticeDetails {...applicationDetails} handleDeleteLease={handleDeleteLease} queue={null} />
          </CardBody>
        </Card>
      )}
    </PageContent>
  );
};

export default UnmarkedWsNoticeView;
