import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconUser } from 'hds-react';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import InternalNavLink from '../../common/internalNavLink/InternalNavLink';
import PageHeader from './pageHeader/PageHeader';
import { IconApplications, IconBoat, IconInvoice, IconWinter } from '../../common/icons';
import HDSToastContainer from '../../common/toast/HDSToastContainer';

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { t } = useTranslation();

  return (
    <Layout
      header={<PageHeader />}
      sidebar={
        <Sidebar>
          {[
            <InternalNavLink key="harbors" to="/harbors" icon={<IconBoat />}>
              {t('common.sidebar.harbors')}
            </InternalNavLink>,
            <InternalNavLink key="winterStorageAreas" to="/winterStorageAreas" icon={<IconWinter />}>
              {t('common.sidebar.winterStorageAreas')}
            </InternalNavLink>,
            <InternalNavLink key="applications" to="/applications" icon={<IconApplications />}>
              {t('common.sidebar.applications')}
            </InternalNavLink>,
            <InternalNavLink key="customers" to="/customers" icon={<IconUser />}>
              {t('common.sidebar.customers')}
            </InternalNavLink>,
            <InternalNavLink key="pricing" to="/pricing" icon={<IconInvoice />}>
              {t('common.sidebar.pricing')}
            </InternalNavLink>,
          ]}
        </Sidebar>
      }
    >
      <HDSToastContainer />
      {children}
    </Layout>
  );
};

export default Page;
