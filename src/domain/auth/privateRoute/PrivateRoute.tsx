import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

import authService from '../authService';

const PrivateRoute: React.SFC<RouteProps> = props => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

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
