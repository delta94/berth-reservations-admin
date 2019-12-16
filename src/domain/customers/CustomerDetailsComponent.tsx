import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Grid from '../../common/grid/Grid';
import styles from './customerList.module.scss';
import Paragraph from '../../common/paragraph/Paragraph';

const CustomerDetails = () => {
  const { t } = useTranslation();

  return (
    <Grid>
      <div className={classNames(styles.section, styles.harborAddress)}>
        <div className={classNames(styles.address)}>
          <Paragraph title={t('harbors.details.address')}>
            placeholder
          </Paragraph>
        </div>
      </div>
      <div className={classNames(styles.section)}>placeholder</div>
      <div className={classNames(styles.section)}>
        <Paragraph title={t('harbors.details.recentActivities')}>-</Paragraph>
      </div>
    </Grid>
  );
};

export default CustomerDetails;
