import { UserManagerSettings } from 'oidc-client-ts';
import { environment } from 'src/enviroment/enviroment';

export const oidcConfig: UserManagerSettings = {
  authority: 'http://localhost:9011/a5ce3666-6404-5160-ecc9-fd98306e94dc', // FusionAuth base URL
  client_id: environment.auth.clientId, // Replace with your FusionAuth client ID
  redirect_uri: environment.auth.redirectUri, // Redirect URI after login
  post_logout_redirect_uri: environment.auth.postLogoutRedirectUri, // Redirect URI after logout
  response_type: 'code', // Authorization Code Flow
  scope: environment.auth.scope, // Scopes you want to request
  filterProtocolClaims: true,
  loadUserInfo: true,
  // client_secret: environment.auth.client_secret, // Client secret if needed
};