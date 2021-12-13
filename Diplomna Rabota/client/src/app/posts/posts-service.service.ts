import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/Post";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  findAllUrl = environment.apiUrl+"post/findAll"
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get<Post[]>(this.findAllUrl);


  }
}
