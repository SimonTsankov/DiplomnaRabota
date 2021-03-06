import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './authentication/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ChipsModule} from "primeng/chips";
import {PostsComponent} from './PostsComponents/posts/posts.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SplitterModule} from "primeng/splitter";
import {SafeHtmlPipe} from './PostsComponents/posts/safe-html.pipe';
import {InterceptorInterceptor} from "./authentication/AuthServices/Interceptor/interceptor.interceptor";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MyprofileComponent } from './UserComponents/myprofile/myprofile.component';
import {ToastModule} from "primeng/toast";
import {MatCardModule} from "@angular/material/card";
import {AddPostComponent} from "./PostsComponents/add-post/add-post.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {RippleModule} from "primeng/ripple";
import {UserSearchComponent} from "./UserComponents/user-search/user-search.component";
import {ToggleButtonModule} from "primeng/togglebutton";
import {TabViewModule} from "primeng/tabview";
import {MatTabsModule} from "@angular/material/tabs";
import { NotificationComponent } from './UserComponents/Notification/notification/notification.component';
import {MatMenuModule} from "@angular/material/menu";
import {MenubarModule} from "primeng/menubar";
import {MenuModule} from "primeng/menu";
import {DropdownModule} from "primeng/dropdown";
import { SpotifyRedirectComponent } from './Spotify/spotify-redirect/spotify-redirect.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import { AddToPlaylistComponent } from './Spotify/add-to-playlist/add-to-playlist.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {StepsModule} from "primeng/steps";
import { SendSongComponent } from './Spotify/send-song/send-song.component';
import { ChangePasswordComponent } from './UserComponents/change-password/change-password.component';
import { RequestNewpasswordComponent } from './UserComponents/request-newpassword/request-newpassword.component';
import { ConfirmEmailComponent } from './UserComponents/confirm-email/confirm-email.component';


@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    PostsComponent,
    SafeHtmlPipe,
    MyprofileComponent,
    UserSearchComponent,
    NotificationComponent,
    SpotifyRedirectComponent,
    AddToPlaylistComponent,
    SendSongComponent,
    ChangePasswordComponent,
    RequestNewpasswordComponent,
    ConfirmEmailComponent
  ],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        ButtonModule,
        TableModule,
        AngularEditorModule,
        HttpClientModule,
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MessagesModule,
        FormsModule,
        EditorModule,
        AutoCompleteModule, ChipsModule, SelectButtonModule, MatButtonToggleModule, SplitterModule, OverlayPanelModule, DragDropModule, ToastModule, MatCardModule, RippleModule, ToggleButtonModule, TabViewModule, MatTabsModule, MatMenuModule, MenubarModule, MenuModule, DropdownModule, ConfirmDialogModule, DialogModule, InputSwitchModule, StepsModule,
    ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
