import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import Expandable from '../../common/expandable/Expandable';
import Button from '../../common/button/Button';
import Icon from '../../common/icon/Icon';
import PageHeader from '../pageHeader/PageHeaderContainer';

const Page: React.SFC = ({ children }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Layout
      header={<PageHeader />}
      sidebar={
        <Sidebar>
          {[
            <Expandable
              key="harbors"
              onClick={() => history.push('/harbors')}
              label={
                <Button
                  variant="text"
                  icon={<Icon name="fence" color="standard" />}
                >
                  {t('common.sidebar.harbors')}
                </Button>
              }
            ></Expandable>,
            <Expandable
              key="customers"
              onClick={() => history.push('/applications')}
              label={
                <Button
                  variant="text"
                  icon={<Icon name="applications" color="standard" />}
                >
                  {t('common.sidebar.applications')}
                </Button>
              }
            ></Expandable>,
            <Expandable
              key="customers"
              onClick={() => history.push('/customers')}
              label={
                <Button
                  variant="text"
                  icon={<Icon name="user" color="standard" />}
                >
                  {t('common.sidebar.customers')}
                </Button>
              }
            ></Expandable>,
          ]}
        </Sidebar>
      }
    >
      {children}
    </Layout>
  );
};

export default Page;
