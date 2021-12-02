import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  findAllUrl = "http://localhost:4713/sl/api/post/findAll"
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.findAllUrl);


  }
}
