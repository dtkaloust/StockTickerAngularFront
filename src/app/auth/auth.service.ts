import { Injectable } from '@angular/core';
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId,
  };

  isLoggedIn(): boolean {
    var isAuth = false;

    var userPool = new CognitoUserPool(this.poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      });
    }
    return isAuth;
  }

  getUser(): CognitoUser {
    var userPool = new CognitoUserPool(this.poolData);
    return userPool.getCurrentUser() || null;
  }

  getAccessToken(): CognitoAccessToken {
    let session = this.getSession();
    return session ? session.getAccessToken() : null;
  }

  getJWT() {
    let accessToken = this.getAccessToken();
    return accessToken ? accessToken.getJwtToken() : '';
  }

  getIdToken(): CognitoIdToken {
    let session = this.getSession();
    return session ? session.getIdToken() : null;
  }

  private getSession(): CognitoUserSession {
    var userPool = new CognitoUserPool(this.poolData);
    var cognitoUser = userPool.getCurrentUser();
    let currentSession;

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return null;
        }
        currentSession = session;
      });
    }
    return currentSession;
  }
}
