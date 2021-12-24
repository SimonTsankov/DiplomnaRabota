import { Injectable } from '@angular/core';
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // getCurrentUserUrl = "http://localhost:4713/sl/api/user-info/get";
  getCurrentUserUrl =environment.apiUrl+"user-info/get";
  updateCurrentUserInfoUrl = environment.apiUrl+"user-info/updateUserInfo";
  constructor(private http: HttpClient) {
  }

  getCurrentUser() {
    return this.http.get<User>(this.getCurrentUserUrl);
  }
  async updateUserInfo(user: User) {
    return await this.http.post(this.updateCurrentUserInfoUrl, user, {responseType: "text"}).toPromise();
  }
}
