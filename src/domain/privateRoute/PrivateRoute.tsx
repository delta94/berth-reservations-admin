import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const PrivateRoute: React.SFC<RouteProps> = props => {
  const mockedAuth = { isAuthenticated: false }; // TODO: replace it with an actual implementation

  if (mockedAuth.isAuthenticated) return <Route {...props} />;

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location },
      }}
    />
  );
};

export default PrivateRoute;
