import {getEnvOrThrow} from '@kottster/common';
import {createApp, createIdentityProvider} from '@kottster/server';

import schema from '../../kottster-app.json';

const JWT_SECRET_SALT = getEnvOrThrow('JWT_SECRET_SALT');
const ADMIN_USERNAME = getEnvOrThrow('ADMIN_USERNAME');
const ADMIN_PASSWORD = getEnvOrThrow('ADMIN_PASSWORD');
const ADMIN_JWT_SECRET = getEnvOrThrow('ADMIN_JWT_SECRET');

/*
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: JWT_SECRET_SALT,
  jwtSecretSalt: JWT_SECRET_SALT,


  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    fileName: 'app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt: ADMIN_JWT_SECRET,

    /* The root admin user credentials */
    rootUsername: ADMIN_USERNAME,
    rootPassword: ADMIN_PASSWORD,
  }),
});