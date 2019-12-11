import React from 'react';
import { RouteComponentProps, useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';
import Button from '../../common/button/Button';
import Text from '../../common/text/Text';
import styles from './loginPage.module.scss';
import Header from '../../common/header/Header';
import Layout from '../../common/layout/Layout';

const LoginPage: React.SFC<RouteComponentProps> = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const login = () => history.replace(from);

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
        <Button size="large" onClick={login}>
          {t('login.loginButton')}
        </Button>
      </div>
    </Layout>
  );
};

export default LoginPage;
