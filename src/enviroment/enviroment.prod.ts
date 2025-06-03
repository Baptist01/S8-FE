export const environment = {
  production: true,
  apiKey: 'devKey',
  auth: {
    clientId: 'fab9c0df-a37b-4b41-864f-5fbe3b3b2f38',
    serverUrl: 'http://fusionauth:9011',
    redirectUri: 'http://fusionauth:4200/callback',
    scope: 'openid email profile offline_access',
  },
  api: {
    url: 'http://api:8080/api',
  },
};
