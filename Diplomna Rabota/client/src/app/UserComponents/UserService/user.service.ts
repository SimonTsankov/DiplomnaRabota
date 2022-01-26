import {Injectable} from '@angular/core';
import {User} from "../../model/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // getCurrentUserUrl = "http://localhost:4713/sl/api/user-info/get";
  getCurrentUserUrl = environment.apiUrl + "user-info/get";
  saveFollowUrl = environment.apiUrl + "user/saveFollow";
  unfollowUrl = environment.apiUrl + "user/unfollow";
  getFollowedUrl = environment.apiUrl + "user/getFollowed"
  searchFollowedUrl = environment.apiUrl + "user/getFollowed"
  searchUsersUrl = environment.apiUrl + "user-info/getUsersForFollow";
  updateCurrentUserInfoUrl = environment.apiUrl + "user-info/updateUserInfo";

  constructor(private http: HttpClient) {
  }

  async unfollow(id: any) {
    return await this.http.delete(this.unfollowUrl + "?id=" + id, {responseType: "text"}).toPromise();
  }

  async followUser(id: any) {
    return await this.http.post(this.saveFollowUrl + "?id=" + id, "", {responseType: "text"}).toPromise();
  }

  getFollowed(searchWord: string) {
    if (searchWord == "" || searchWord == null)
      return this.http.get<User[]>(this.getFollowedUrl);
    else{
      return this.http.get<User[]>(this.searchFollowedUrl);
    }
      }

  getCurrentUser() {
    return this.http.get<User>(this.getCurrentUserUrl);
  }

  getSearchedUsers(searchedWord: string) {
    return this.http.get<User[]>(this.searchUsersUrl + "?searchWord=" + searchedWord);
  }

  async updateUserInfo(user: User) {
    return await this.http.post(this.updateCurrentUserInfoUrl, user, {responseType: "text"}).toPromise();
  }
}
