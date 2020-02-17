import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

import i18n from '../../locales/i18n';
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
    path ? { data: { path } } : { data: { path: '/' } }
  );
};

const {
  REACT_APP_TUNNISTAMO_URI,
  REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT,
} = process.env;

export const logoutTunnistamo = async () => {
  try {
    await userManager.signoutRedirect();
  } catch (e) {
    Sentry.captureException(e);
  }
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
    toast(i18n.t('authentication.errorMessage'), {
      type: toast.TYPE.ERROR,
    });
    try {
      // VEN-378: This is a workaround that can save us until we can fix silentRenew().
      loginTunnistamo();
      Sentry.captureMessage(
        'authenticateWithBackend() failed - running loggingTunnistamo()'
      );
    } catch (loginTunnistamoError) {
      Sentry.captureException(error);
      Sentry.captureException(loginTunnistamoError);
      dispatch(fetchTokenError(error));
    }
  }
};
