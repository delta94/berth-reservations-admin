import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StoreState } from '../app/types/AppTypes';

const PrivateRoute: React.SFC<RouteProps> = props => {
  const location = useLocation();
  const isAuthenticated = useSelector<StoreState, string | undefined>(
    store => store.authentication.tunnistamo.user?.access_token
  );

  if (isAuthenticated) return <Route {...props} />;

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
