import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {AddPostComponent} from "./PostsComponents/add-post/add-post.component";
import {PostsComponent} from "./PostsComponents/posts/posts.component";
import {MyprofileComponent} from "./UserComponents/myprofile/myprofile.component";
import {UserSearchComponent} from "./UserComponents/user-search/user-search.component";
import {SpotifyRedirectComponent} from "./Spotify/spotify-redirect/spotify-redirect.component";
import {AddToPlaylistComponent} from "./Spotify/add-to-playlist/add-to-playlist.component";

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addpost', component: AddPostComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'user-search', component: UserSearchComponent},
  {path: 'myprofile', component: MyprofileComponent},
  {path: 'spotify-redirect', component: SpotifyRedirectComponent},
  {path: 'add-to-playlist', component: AddToPlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
