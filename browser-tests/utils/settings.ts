// @ts-ignore
require('dotenv').config({ path: '.env.development.local' });

const TEST_ENV_URL = 'https://venepaikka-admin.test.kuva.hel.ninja';
const LOCAL_ENV_URL = 'http://localhost:3000';

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

export const envUrl = (): string => {
  switch (process.env.TEST_ENV) {
    case 'local':
      return LOCAL_ENV_URL;
    case 'test':
      return TEST_ENV_URL;
    default:
      return TEST_ENV_URL;
  }
};
