import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import Expandable from '../../common/expandable/Expandable';
import InternalLink from '../../common/internalLink/InternalLink';
import Text from '../../common/text/Text';
import Header from '../../common/header/Header';
import Button from '../../common/button/Button';
import Icon from '../../common/icon/Icon';
import HelsinkiLogo from '../../common/helsinkiLogo/HelsinkiLogo';

const Page: React.SFC = ({ children }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const PageHeader = () => (
    <Header>
      <Link to="/">
        <HelsinkiLogo size="large" color="white" />
      </Link>
    </Header>
  );

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
                <InternalLink to="harbors">
                  <Button
                    variant="text"
                    icon={<Icon name="fence" color="standard" />}
                  >
                    <Text bold>{t('common.sidebar.harbors')}</Text>
                  </Button>
                </InternalLink>
              }
            ></Expandable>,
            <Expandable
              key="customers"
              onClick={() => history.push('/customers')}
              label={
                <InternalLink to="customers">
                  <Button
                    variant="text"
                    icon={<Icon name="individual" color="standard" />}
                  >
                    <Text bold>{t('common.sidebar.customers')}</Text>
                  </Button>
                </InternalLink>
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
