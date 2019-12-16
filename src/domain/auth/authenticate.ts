import userManager from './userManager';

export const loginTunnistamo = (path?: string) => {
  userManager.signinRedirect(
    path ? { data: { path } } : { data: { path: '/' } }
  );
};

export const logoutTunnistamo = (path?: string) => {
  userManager.signoutRedirect(path ? { data: { path } } : {});
};
