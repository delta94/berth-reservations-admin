import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import HelsinkiLogo from '../../../common/helsinkiLogo/HelsinkiLogo';
import Text from '../../../common/text/Text';
import styles from './loginPage.module.scss';
import Header from '../../../common/header/Header';
import Layout from '../../../common/layout/Layout';
import authService from '../authService';

type LocationState = { from: Location } | null | undefined;

const LoginPage = () => {
  const { t } = useTranslation();
  const location = useLocation<LocationState>();
  const isAuthenticated = authService.isAuthenticated();
  const pathname = location.state?.from?.pathname ?? '/';

  if (isAuthenticated) return <Redirect to={pathname} />;

  return (
    <Layout
      header={
        <Header>
          <HelsinkiLogo size="large" color="white" />
        </Header>
      }
    >
      <div className={styles.body}>
        <HelsinkiLogo size="large" />
        <div className={styles.contentWrapper}>
          <Text as="h3">{t('login.heading')}</Text>
        </div>
        <Button theme="coat" onClick={() => authService.login(pathname)}>
          {t('login.loginButton')}
        </Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
