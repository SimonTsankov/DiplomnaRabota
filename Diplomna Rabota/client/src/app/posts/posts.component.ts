import {Component, OnInit} from '@angular/core';
import {Post} from "../models/Post";
import {PostsServiceService} from "./posts-service.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post = {} as Post;

  // @ts-ignore
  dataSource;

  constructor(private postsService: PostsServiceService) {
  }

  ngOnInit(): void {
    this.refreshPosts()

  }

   async refreshPosts() {
     this.postsService.getAllPosts().subscribe(data => this.dataSource = data)
  }
}
