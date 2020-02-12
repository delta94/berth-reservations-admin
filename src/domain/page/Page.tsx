import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import { IconApplications, IconBoat, IconFemale } from '../../common/icons';
import InternalLink from '../../common/internalLink/NavLink';
import PageHeader from '../pageHeader/PageHeaderContainer';
import styles from '../../common/icons/icon.module.scss';

const Page: React.SFC = ({ children }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Layout
      header={<PageHeader />}
      sidebar={
        <Sidebar>
          {[
            <InternalLink
              to="/harbors"
              onClick={() => history.push('/harbors')}
              icon={<IconBoat className={styles.icon} />}
            >
              {t('common.sidebar.harbors')}
            </InternalLink>,
            <InternalLink
              to="/customers"
              onClick={() => history.push('/customers')}
              icon={<IconFemale className={styles.icon} />}
            >
              {t('common.sidebar.customers')}
            </InternalLink>,
            <InternalLink
              to="/applications"
              onClick={() => history.push('/applications')}
              icon={<IconApplications className={styles.icon} />}
            >
              {t('common.sidebar.applications')}
            </InternalLink>,
          ]}
        </Sidebar>
      }
    >
      {children}
    </Layout>
  );
};

export default Page;
