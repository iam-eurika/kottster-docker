"use strict";
const server = require("@kottster/server");
const {getEnvOrThrow} = require('@kottster/common');

const id = "a3ca156c-589b-4f46-9a17-40b20c2c9ab2";
const meta = { "name": "Admin Panel", "icon": "https://web.kottster.app/icon.png" };
const schema = {
  id,
  meta
};


const JWT_SECRET_SALT = getEnvOrThrow('JWT_SECRET_SALT');
const ADMIN_USERNAME = getEnvOrThrow('ADMIN_USERNAME');
const ADMIN_PASSWORD = getEnvOrThrow('ADMIN_PASSWORD');
const ADMIN_JWT_SECRET = getEnvOrThrow('ADMIN_JWT_SECRET');
const app = server.createApp({
  schema,
  secretKey: JWT_SECRET_SALT,
  kottsterApiToken: "KylaH0sqhr8X7A7kFackPztQVqlRnAVA",
  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: server.createIdentityProvider("sqlite", {
    fileName: "app.db",
    passwordHashAlgorithm: "bcrypt",
    jwtSecretSalt: ADMIN_JWT_SECRET,
    /* The root admin user credentials */
    rootUsername: ADMIN_USERNAME,
    rootPassword: ADMIN_PASSWORD
  })
});
async function bootstrap() {
  await app.listen();
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
