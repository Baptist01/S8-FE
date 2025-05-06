export const environment = {
  production: false,
  apiKey: 'devKey',
  auth: {
    // clientId: '86fdf592-fbc1-4690-84b5-f8ea0649722e',
    clientId: '29f41feb-c86d-4573-a50a-95fcd46f40a5',
    serverUrl: 'http://localhost:9011',
    redirectUri: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200/',
    scope: 'openid email profile address phone offline_access claims',
  },
  api: {
    url: 'http://localhost:5000/api',
  },
};
