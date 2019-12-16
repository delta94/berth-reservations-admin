import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';
import Button from '../../common/button/Button';
import Text from '../../common/text/Text';
import styles from './loginPage.module.scss';
import Header from '../../common/header/Header';
import Layout from '../../common/layout/Layout';
import { loginTunnistamo, logoutTunnistamo } from '../auth/authenticate';

const LoginPage: React.SFC<RouteComponentProps & any> = props => {
  const { t } = useTranslation();
  const login = () => loginTunnistamo();
  const logout = () => logoutTunnistamo();
  return (
    <Layout
      header={
        <Header>
          <HelsinkiLogo size="large" />
        </Header>
      }
    >
      <div className={styles.body}>
        <HelsinkiLogo size="large" />
        <div className={styles.contentWrapper}>
          <Text as="h3">{t('login.heading')}</Text>
        </div>
        {(!props.isAuthenticated || true) && (
          <Button size="large" onClick={login}>
            {t('login.loginButton')}
          </Button>
        )}
        {(props.isAuthenticated || true) && (
          <Button size="large" color="critical" onClick={logout}>
            {`Kirjaudu ulos`}
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default LoginPage;
