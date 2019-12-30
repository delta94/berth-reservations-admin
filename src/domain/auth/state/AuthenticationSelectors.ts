import { StoreState } from '../../app/types/AppTypes';

export const apiTokenSelector = (state: StoreState) =>
  state.authentication.tunnistamo.user?.access_token;

export const isLoadingUserSelector = (state: StoreState) =>
  state.authentication.tunnistamo.isLoadingUser ||
  state.authentication.backend.isFetchingToken;

export const isAuthenticatedSelector = (state: StoreState) =>
  state.authentication.backend.isAuthenticated;

export const userSelector = (state: StoreState) =>
  state.authentication.tunnistamo.user;
