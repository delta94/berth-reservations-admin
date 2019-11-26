import React from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../common/layout/Layout';
import Sidebar from '../../common/sidebar/Sidebar';
import Expandable from '../../common/expandable/Expandable';
import InternalNavLink from '../../common/internalNavLink/InternalNavLink';
import Icon from '../../common/icon/Icon';
import Text from '../../common/text/Text';
import Header from '../../common/header/Header';

const Page: React.SFC = ({ children }) => {
  const history = useHistory();

  return (
    <Layout
      header={<Header />}
      sidebar={
        <Sidebar>
          {[
            <Expandable
              key="harbors"
              onClick={() => history.push('/harbors')}
              label={
                <InternalNavLink
                  to="harbors"
                  icon={<Icon name="fence" color="standard" />}
                >
                  <Text bold>Venepaikat</Text>
                </InternalNavLink>
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
