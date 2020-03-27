import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import authService from '../authService';
import LoadingSpinner from '../../../common/spinner/LoadingSpinner';

export type SilentRenewPageProps = RouteComponentProps;

const SilentRenewPage: React.SFC<SilentRenewPageProps> = ({ history }) => {
  const client = useApolloClient();

  useEffect(() => {
    authService
      .endRenewToken()
      .then(user => {
        const currentUser = user
          ? { __typename: 'CurrentUser', ...user.profile }
          : null;

        client.writeData({
          data: { currentUser },
        });
      })
      .catch(() => {
        // TODO: handle errors
      });
  });

  return <LoadingSpinner isLoading />;
};

export default SilentRenewPage;
