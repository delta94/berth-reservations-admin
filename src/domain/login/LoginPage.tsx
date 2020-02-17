import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'hds-react';

import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';
import Text from '../../common/text/Text';
import styles from './loginPage.module.scss';
import Header from '../../common/header/Header';
import Layout from '../../common/layout/Layout';
import { loginTunnistamo } from '../auth/authenticate';

const LoginPage: React.SFC<RouteComponentProps> = props => {
  const { t } = useTranslation();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => loginTunnistamo(from);

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
        <Button onClick={login}>{t('login.loginButton')}</Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
