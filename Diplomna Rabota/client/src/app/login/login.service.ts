import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = "http://localhost:4713/sl/login";

  constructor(private htttp: HttpClient) {
  }

  async login(username: string, password: string) {
    try {
      var tokens = JSON.parse(await this.htttp.post(this.loginUrl, new LoginInfo(username, password), {responseType: "text"}).toPromise());
      window.localStorage.setItem("access_token", tokens.access_token)
      window.localStorage.setItem("refresh_token", tokens.refresh_token)
      return true;
    } catch (exception) {
      return false;
    }
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

