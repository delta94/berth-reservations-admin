import axios, { AxiosResponse } from 'axios';

import userManager from './userManager';
import { StoreThunk } from '../app/types/AppTypes';
import {
  startFetchingToken,
  fetchTokenSuccess,
  fetchTokenError,
} from './state/BackendAuthenticationActions';
import { BackendTokenResponse } from './types/BackendAuthenticationTypes';

export const loginTunnistamo = (path?: string) => {
  userManager.signinRedirect(
    path ? { data: { path: path } } : { data: { path: '/' } }
  );
};

const {
  REACT_APP_TUNNISTAMO_URI,
  REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT,
  REACT_APP_TUNNISTAMO_LOGOUT_ENDPOINT,
} = process.env;

export const logoutTunnistamo = (path?: string) => {
  userManager.signoutRedirect(path ? { data: { path } } : {});
  userManager.getUser().then(result => {
    if (result) {
      userManager.signoutRedirectCallback(
        `${REACT_APP_TUNNISTAMO_URI}/${REACT_APP_TUNNISTAMO_LOGOUT_ENDPOINT}/`
      );
    }
  });
};

export const authenticateWithBackend = (
  accessToken: string
): StoreThunk => async dispatch => {
  try {
    dispatch(startFetchingToken());
    const res: AxiosResponse<BackendTokenResponse> = await axios.post(
      `${REACT_APP_TUNNISTAMO_URI}/${REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT}/`,
      {},
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      }
    );

    dispatch(fetchTokenSuccess(res.data));
  } catch (error) {
    dispatch(fetchTokenError(error));
  }
};
