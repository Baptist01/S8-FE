export const environment = {
  production: false,
  apiKey: 'devKey',
  auth: {
    clientId: '86fdf592-fbc1-4690-84b5-f8ea0649722e',
    serverUrl: 'http://localhost:9011',
    redirectUri: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200',
    scope: 'openid email profile address phone offline_access claims',
  },
  authUrls: {
    login: 'http://localhost:9011/oauth2/authorize?client_id=86fdf592-fbc1-4690-84b5-f8ea0649722e&response_type=code&redirect_uri=http//localhost:4200/callback',
    logout: 'http://localhost:9011/oauth2/logout?client_id=86fdf592-fbc1-4690-84b5-f8ea0649722e',
    introspect: 'http://localhost:9011/oauth2/introspect',
    token: 'http://localhost:9011/oauth2/token',
    userInfo: 'http://localhost:9011/oauth2/userinfo',
    jwt: 'http://localhost:9011/.well-known/jwks.json',
  },
  api: {
    url: 'https://localhost:7219/api',
  },
};
