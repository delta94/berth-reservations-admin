import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import authService from '../authService';
import LoadingSpinner from '../../../common/spinner/LoadingSpinner';
import Layout from '../../../common/layout/Layout';
import Header from '../../../common/header/Header';
import HelsinkiLogo from '../../../common/helsinkiLogo/HelsinkiLogo';

export type CallbackPageProps = RouteComponentProps;

const CallbackPage: React.SFC<CallbackPageProps> = ({ history }) => {
  const client = useApolloClient();

  useEffect(() => {
    authService
      .endLogin()
      .then(user => {
        client.writeData({
          data: { currentUser: { __typename: 'CurrentUser', ...user.profile } },
        });
        history.replace(user.state.path);
      })
      .catch(() => {
        // TODO: handle errors
        history.replace('/login');
      });
  });

  return (
    <Layout
      header={
        <Header>
          <HelsinkiLogo size="large" color="white" />
        </Header>
      }
    >
      <LoadingSpinner isLoading />
    </Layout>
  );
};

export default CallbackPage;
