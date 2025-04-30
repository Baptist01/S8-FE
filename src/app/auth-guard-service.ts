import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client-ts';
import { environment } from 'src/enviroment/enviroment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userManager: UserManager;
  private httpClient: HttpClient;
  private accessToken: string = '';
  private refreshToken: string = '';
  private userId: string | null = null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.userManager = new UserManager({
      authority: environment.auth.serverUrl,
      client_id: environment.auth.clientId,
      redirect_uri: environment.auth.redirectUri,
      response_type: 'code',
      scope: environment.auth.scope,
      filterProtocolClaims: true,
      loadUserInfo: true,
    });
  }

  isLoggedIn(): boolean {
    this.accessToken = localStorage.getItem('access_token') || '';
    this.userId = localStorage.getItem('userId') || null;
    if (this.accessToken !== '' || this.userId) {
      return true;
    } else {
      return false;
    }    
  }

  login(): void {
    this.userManager.signinRedirect();
  }

  async handleCallback(): Promise<void> {
    try {
      const url = window.location.href;
      var state = url.split('state=')[1].split('&')[0];
      var code = url.split('code=')[1].split('&')[0];

      const storedKey = `oidc.${state}`;
      const storedValue = localStorage.getItem(storedKey);

      const storedObject = JSON.parse(storedValue ?? '{}');
      const codeVerifier = storedObject.code_verifier;

      const body = new HttpParams()
        .set('client_id', environment.auth.clientId)
        .set('redirect_uri', environment.auth.redirectUri)
        .set('grant_type', 'authorization_code')
        .set('code', code)
        .set('code_verifier', codeVerifier);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      this.httpClient
        .post(environment.authUrls.token, body.toString(), { headers })
        .subscribe(
          (response) => {
            console.log('Token response:', response);
            this.setTokens(response);
          },
          (error) => {
            console.error('Token error:', error);
          },
        );
    } catch (error) {
      console.error(error);
    }
  }

  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  // refreshAccessToken(): void {
  //   const refreshToken = sessionStorage.getItem('refresh_token');
  //   if (!refreshToken) {
  //     console.error('No refresh token available');
  //     return;
  //   }
  
  //   const body = new HttpParams()
  //     .set('client_id', environment.auth.clientId)
  //     .set('grant_type', 'refresh_token')
  //     .set('refresh_token', refreshToken);
  
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });
  
  //   this.httpClient
  //     .post(environment.authUrls.token, body.toString(), { headers })
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Token refreshed:', response);
  //         this.setTokens(response);
  //       },
  //       (error) => {
  //         console.error('Refresh token error:', error);
  //       }
  //     );
  // }

  setTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.access_token);
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;

    this.userId = tokens.userId;
    localStorage.setItem('userId', tokens.userId);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getUserId(): string | null {
    return this.userId;
  }

  logout(): void {
    // this.httpClient.get("http://localhost:9011/oauth2/logout", {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${this.accessToken}`,
    //   }),
    // }).subscribe(
    //   (response) => {
    //     console.log('Logout response:', response);
    //   },
    //   (error) => {
    //     console.error('Logout error:', error);
    //   }
    // );
    this.userManager.signoutRedirect();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    this.isLoggedIn();
  }
}
