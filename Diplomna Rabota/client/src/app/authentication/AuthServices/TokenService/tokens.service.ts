import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  private refreshUrl = environment.apiUrl + "user/token/refresh";

  constructor(private http: HttpClient) {
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

  async refreshToken() {
    let tokens = JSON.parse(await this.http.get(this.refreshUrl, {
      responseType: "text",
      headers: {'skipRefreshTokenUrl': "true"}
    }).toPromise());
    this.saveAccessToken(tokens.access_token);
    console.log("REFRESHED")
  }

  tokenExpired(token: string) {
    if (token == null) {
      return null;
    }
    try {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Date.now() >= expiry * 1000);
    } catch (exception) {
      return (exception.status)
    }
  }
}
