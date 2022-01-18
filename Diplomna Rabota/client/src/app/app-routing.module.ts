import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {AddPostComponent} from "./PostsComponents/add-post/add-post.component";
import {PostsComponent} from "./PostsComponents/posts/posts.component";
import {MyprofileComponent} from "./myprofile/myprofile.component";

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addpost', component: AddPostComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'myprofile', component: MyprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
