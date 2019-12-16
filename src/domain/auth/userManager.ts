import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

const {
  REACT_APP_TUNNISTAMO_URI,
  REACT_APP_TUNNISTAMO_CLIENT_ID,
  REACT_APP_TUNNISTAMO_SCOPE,
} = process.env;

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  authority: REACT_APP_TUNNISTAMO_URI,
  automaticSilentRenew: true,
  client_id: REACT_APP_TUNNISTAMO_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  response_type: 'id_token token',
  silent_redirect_uri: `${location}/silent_renew`,
  scope: REACT_APP_TUNNISTAMO_SCOPE,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

export default userManager;
