export const environment = {
  production: false,
  apiKey: 'devKey',
  auth: {
    clientId: 'fab9c0df-a37b-4b41-864f-5fbe3b3b2f38',
    serverUrl: 'http://localhost:9011',
    redirectUri: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200/',
    scope: 'openid email profile address phone offline_access claims',
  },
  api: {
    url: 'http://localhost:5000/api',
  },
};
