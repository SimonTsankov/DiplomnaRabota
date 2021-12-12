import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private  registerUrl="http://localhost:4713/sl/api/user/register";

  constructor(private http: HttpClient) {
  }
  async register(user: User) {
    return await this.http.post(this.registerUrl, user, {responseType: "text"}).toPromise();
  }
}
