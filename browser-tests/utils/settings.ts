// @ts-ignore
require('dotenv').config({ path: '.env.development.local' });

export const testUsername = (): string => {
  if (!process.env.BROWSER_TESTS_UID) {
    throw new Error('No BROWSER_TESTS_UID specified.');
  }
  return process.env.BROWSER_TESTS_UID;
};

export const testUserPassword = (): string => {
  if (!process.env.BROWSER_TESTS_PWD) {
    throw new Error('No BROWSER_TESTS_PWD specified.');
  }
  return process.env.BROWSER_TESTS_PWD;
};
