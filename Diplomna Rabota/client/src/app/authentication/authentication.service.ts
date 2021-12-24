import { Injectable } from '@angular/core';
import {UserModel} from "../model/UserModel";
import {EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //@ts-ignore
  user: UserModel;

  constructor() { }
  checkLogin() {
    let token = window.localStorage.getItem("access_token");

    if (!token) return false;
    let payloadEncoded = token.split('.')[1];
    let payloadDecoded = atob(payloadEncoded);

    if (!payloadDecoded) return false;
    let payload = JSON.parse(payloadDecoded);
    let expDate = new Date(payload.exp * 1000);

    return expDate > new Date();
  }

  public getUser(token: string): UserModel | null{

    if(token == null){
      this.user = {} as UserModel;
      return this.user;
    }
  try {

    var x = JSON.parse(atob(token.split('.')[1])) as UserModel;
    // console.log(x);
    return JSON.parse(atob(token.split('.')[1])) as UserModel;

  }catch (error){
      console.log(error)
    return null
  }
    }
}
