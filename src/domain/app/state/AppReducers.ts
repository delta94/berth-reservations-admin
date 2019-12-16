import { combineReducers } from 'redux-starter-kit';

import authenticationReducers from '../../auth/state/AuthenticationReducers';

export default combineReducers({
  authentication: authenticationReducers,
});
