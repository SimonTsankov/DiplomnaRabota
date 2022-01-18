import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  postSaveUrl = environment.apiUrl+"post/save"
  findAllUrl = environment.apiUrl+"post/findAll"
  findByUser = environment.apiUrl+"post/findByUser"
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.findAllUrl);
  }
  async savePost(uploadImageData:any){
    return this.http.post(this.postSaveUrl, uploadImageData, {responseType: "text"}).toPromise()
  }
  getUsersPosts(user: User) {
    return this.http.get<Post[]>(this.findByUser);
  }
}
