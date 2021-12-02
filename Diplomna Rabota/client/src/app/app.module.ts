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
import {HttpClientModule} from "@angular/common/http";
import {EditorModule} from "primeng/editor";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import { AngularEditorModule } from '@kolkov/angular-editor';
import {ChipsModule} from "primeng/chips";
import { PostsComponent } from './posts/posts.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SplitterModule} from "primeng/splitter";


@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddPostComponent,
    PostsComponent
  ],
    imports: [FormsModule,
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
        FormsModule,
        EditorModule,
        AutoCompleteModule, ChipsModule, SelectButtonModule, MatButtonToggleModule, SplitterModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
