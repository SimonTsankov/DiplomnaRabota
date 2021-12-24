import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private  registerUrl=environment.apiUrl+"user/register";

  constructor(private http: HttpClient) {
  }
  async register(user: User) {
    return await this.http.post(this.registerUrl, user, {responseType: "text"}).toPromise();
  }
}
