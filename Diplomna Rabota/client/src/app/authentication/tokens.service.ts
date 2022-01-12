import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() {
  }

  saveAccessToken(access_token: any) {
    window.localStorage.setItem("access_token", access_token);
  }

  saveRefreshToken(refresh_token: any) {
    window.localStorage.setItem("refresh_token", refresh_token);
  }

  getAccessToken() {

      return window.localStorage.getItem("access_token");

  }

  getRefreshToken() {

      return window.localStorage.getItem("refresh_token");

  }

  saveTokens(access_token: any, refresh_token: any) {
    window.localStorage.setItem("access_token", access_token);
    window.localStorage.setItem("refresh_token", refresh_token);
  }

  removeTokens() {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
  }

  tokenExpired(token: string) {

    if (token == null) {
      return null;
    }
    try {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } catch (exception) {
      return (exception.status)
    }
  }
}
