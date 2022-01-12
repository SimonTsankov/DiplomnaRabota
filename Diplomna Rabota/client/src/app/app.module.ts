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
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterComponent} from './register/register.component';
import {AddPostComponent} from './add-post/add-post.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ChipsModule} from "primeng/chips";
import {PostsComponent} from './posts/posts.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SplitterModule} from "primeng/splitter";
import {SafeHtmlPipe} from './posts/safe-html.pipe';
import {InterceptorInterceptor} from "./authentication/interceptor.interceptor";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { MyprofileComponent } from './myprofile/myprofile.component';
import {ToastModule} from "primeng/toast";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    PostsComponent,
    SafeHtmlPipe,
    MyprofileComponent
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
        AutoCompleteModule, ChipsModule, SelectButtonModule, MatButtonToggleModule, SplitterModule, OverlayPanelModule, DragDropModule, ToastModule, MatCardModule,
    ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
