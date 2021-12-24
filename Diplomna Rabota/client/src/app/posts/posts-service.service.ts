import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";
import {environment} from "../../environments/environment";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  findAllUrl = environment.apiUrl+"post/findAll"
  findByUser = environment.apiUrl+"post/findByUser"
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.findAllUrl);
  }

  getUsersPosts(user: User) {
    return this.http.get<Post[]>(this.findByUser);
  }
}
