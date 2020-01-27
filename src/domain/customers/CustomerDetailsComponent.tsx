import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Grid from '../../common/grid/Grid';
import styles from './customerList.module.scss';
import Section from '../../common/section/Section';

const CustomerDetails = () => {
  const { t } = useTranslation();

  return (
    <Grid>
      <div className={classNames(styles.section, styles.harborAddress)}>
        <div className={classNames(styles.address)}>
          <Section title={t('harbors.details.address')}>placeholder</Section>
        </div>
      </div>
      <div className={classNames(styles.section)}>placeholder</div>
      <div className={classNames(styles.section)}>
        <Section title={t('harbors.details.recentActivities')}>-</Section>
      </div>
    </Grid>
  );
};

export default CustomerDetails;
