import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import InternalNavLink from '../../common/internalNavLink/InternalNavLink';
import PageHeader from '../pageHeader/PageHeaderContainer';
import Icon from '../../common/icons/Icon';

const Page: React.SFC = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Layout
      header={<PageHeader />}
      sidebar={
        <Sidebar>
          {[
            <InternalNavLink
              key="harbors"
              to="/harbors"
              icon={<Icon shape="IconBoat" />}
            >
              {t('common.sidebar.harbors')}
            </InternalNavLink>,
            <InternalNavLink
              key="applications"
              to="/applications"
              icon={<Icon shape="IconApplications" />}
            >
              {t('common.sidebar.applications')}
            </InternalNavLink>,
            <InternalNavLink
              key="customers"
              to="/customers"
              icon={<Icon shape="IconPerson" />}
            >
              {t('common.sidebar.customers')}
            </InternalNavLink>,
            <InternalNavLink
              key="pricing"
              to="/pricing"
              icon={<Icon shape="IconInvoice" />}
            >
              {t('common.sidebar.pricing')}
            </InternalNavLink>,
          ]}
        </Sidebar>
      }
    >
      {children}
    </Layout>
  );
};

export default Page;
