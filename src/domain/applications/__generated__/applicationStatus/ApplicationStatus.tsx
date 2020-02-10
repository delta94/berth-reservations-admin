import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { ApplicationStatus as ApplicationStatusType } from '../../../../../__generated__/globalTypes';
import styles from './applicationStatus.module.scss';

export interface ApplicationStatusProps {
  status: ApplicationStatusType;
}

const APPLICATION_STATUS = {
  PENDING: 'applications.status.pending',
  OFFER_GENERATED: 'applications.status.offerGenerated',
  OFFER_SENT: 'applications.status.offerSent',
  HANDLED: 'applications.status.handled',
  EXPIRED: 'applications.status.expired',
};

const ApplicationStatus: React.SFC<ApplicationStatusProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <span
      className={classNames(styles.applicationStatus, {
        [styles.expired]: status === 'EXPIRED',
        [styles.handled]: status === 'HANDLED',
        [styles.offerGenerated]: status === 'OFFER_GENERATED',
        [styles.offerSent]: status === 'OFFER_SENT',
        [styles.pending]: status === 'PENDING',
      })}
    >
      {t(APPLICATION_STATUS[status])}
    </span>
  );
};

export default ApplicationStatus;
