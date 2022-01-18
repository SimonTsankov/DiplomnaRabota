import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = environment.loginUrl;

  constructor(private htttp: HttpClient) {
  }

  async login(username: string, password: string) {
      var tokens = JSON.parse(await this.htttp.post(this.loginUrl, new LoginInfo(username, password), {responseType: "text"}).toPromise());
      window.localStorage.setItem("access_token", tokens.access_token)
      window.localStorage.setItem("refresh_token", tokens.refresh_token)
      return true;
  }

}

class LoginInfo {
  constructor(email: string, password: string) {
    this.username = email;
    this.password = password;
  }

  username: string;
  password: string;

}

