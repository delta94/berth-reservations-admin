import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../../common/card/Card';
import styles from './applicationsCard.module.scss';
import CardHeader from '../../../common/cardHeader/CardHeader';
import CardBody from '../../../common/cardBody/CardBody';
import ApplicationDetails from '../../../common/applicationDetails/ApplicationDetails';
import { Application } from '../types';

export interface ApplicationsCardProps {
  applications: Application[];
}

const ApplicationsCard = ({ applications }: ApplicationsCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.applicationsCard}>
      <CardHeader title={t('customerView.application.title')} />
      {applications.map((application) => (
        <CardBody key={application.id}>
          <ApplicationDetails {...application} />
        </CardBody>
      ))}
    </Card>
  );
};

export default ApplicationsCard;
