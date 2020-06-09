import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconAlertCircle } from 'hds-react';

import styles from './errorPage.module.scss';
import Text from '../../common/text/Text';
import ExternalLink from '../../common/externalLink/ExternalLink';
import Layout from '../../common/layout/Layout';
import Header from '../../common/header/Header';
import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Layout
      header={
        <Header>
          <HelsinkiLogo size="large" color="white" />
        </Header>
      }
    >
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <IconAlertCircle size="m" />
          <Text as="h1" className={styles.heading}>
            {t('errorPage.heading')}
          </Text>
          <Text className={styles.text}>{t('errorPage.text')}</Text>
          <ExternalLink href="/" target="_self">
            {t('errorPage.linkText')}
          </ExternalLink>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
