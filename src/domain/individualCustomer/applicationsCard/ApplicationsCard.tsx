import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import styles from './applicationsCard.module.scss';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import ApplicationDetails from '../../cards/applicationDetails/ApplicationDetails';
import { ApplicationStatus } from '../../../@types/__generated__/globalTypes';

interface HarborChoice {
  harborName: string;
  harbor: string;
  priority: number;
}

interface Lease {
  id: string;
  harborId: string;
  harborName: string;
}

interface Application {
  id: string;
  isSwitch: boolean;
  createdAt: string;
  queue: number | null;
  status: ApplicationStatus;
  lease: Lease | null;
  boatType?: string | null;
  boatRegistrationNumber: string;
  boatWidth: number;
  boatLength: number;
  boatDraught: number | null;
  boatWeight: number | null;
  boatName: string;
  boatModel: string;
  harborChoices: Array<HarborChoice | null>;
  accessibilityRequired: boolean;
}

export interface ApplicationsCardProps {
  applications: Application[];
}

const ApplicationsCard: React.SFC<ApplicationsCardProps> = ({
  applications,
}) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.applicationCard}>
      <CardHeader title={t('individualCustomer.application.title')} />
      {applications.map(application => (
        <CardBody key={application.id}>
          <ApplicationDetails {...application} />
        </CardBody>
      ))}
    </Card>
  );
};

export default ApplicationsCard;
