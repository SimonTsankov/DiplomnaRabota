import {Injectable} from '@angular/core';
import {UserModel} from "../../../model/UserModel";

import {TokensService} from "../TokenService/tokens.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //@ts-ignore
  user: UserModel;

  constructor(private tokenService: TokensService) {
  }


   checkLogin() {
    let token = this.tokenService.getAccessToken();

    if (!token) return false;
    try {

      let payloadEncoded = token.split('.')[1];
      let payloadDecoded = atob(payloadEncoded);

      if (!payloadDecoded) return false;
      let payload = JSON.parse(payloadDecoded);
      let expDate = new Date(payload.exp * 1000);
      let accessIsExpired = !(expDate > new Date());

      if (accessIsExpired && this.isTokenExpired(this.tokenService.getRefreshToken())) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }

  }

  public getUser(token: string): UserModel | null {

    if (token == null) {
      this.user = {} as UserModel;
      return this.user;
    }
    try {

      var x = JSON.parse(atob(token.split('.')[1])) as UserModel;
      // console.log(x);
      return JSON.parse(atob(token.split('.')[1])) as UserModel;

    } catch (error) {
      console.log(error)
      return null
    }
  }
  getUsername(){
    let jwt= this.tokenService.getAccessToken();
    if(jwt==null){
      return "-"
    }
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData.sub)
    return decodedJwtData.sub.toString()
  }
  isAdmin(){
    let jwt= this.tokenService.getAccessToken();
    if(jwt==null){
      return false
    }
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let isAdmin = decodedJwtData.roles

    return isAdmin.includes('Admin');
  }

  isTokenExpired(token: string | null): boolean {
    if (!token || token === "undefined") return true;
    try {
      // @ts-ignore
      return this.tokenService.tokenExpired(token)
    } catch (exception) {
      return true;
    }
  }
}
