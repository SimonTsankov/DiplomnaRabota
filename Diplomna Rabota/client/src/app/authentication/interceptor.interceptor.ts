import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient
} from '@angular/common/http';
import {EMPTY, from, Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {TokensService} from "./tokens.service";
import {Router} from "@angular/router";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private refreshUrl = environment.apiUrl+"user/token/refresh";
  private loginUrl: string = environment.loginUrl;

  private access_token: string | null = "";
  private refresh_token: string | null = "";
  constructor(private router: Router,private tokenService: TokensService,private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.access_token = this.tokenService.getAccessToken();
    this.refresh_token = this.tokenService.getRefreshToken();

    if(environment.urlsToSkip.includes(request.url.replace(environment.apiUrl,"")) || request.url==environment.loginUrl){
      console.log("skiped interceptor")
      return next.handle(request);
    }

    if (this.access_token == null || this.tokenService.tokenExpired(this.access_token)) {
      if (this.refresh_token == null || this.tokenService.tokenExpired(this.refresh_token)) {
        this.router.navigate(['/login']).catch(console.error) // both access and refresh token are expired
        return EMPTY;
      } else {
        if (request.url != this.refreshUrl) {
          return from(this.handleRedresh(request, next));
        } else {
          request = this.modifyRequest(request, this.refresh_token)
          return next.handle(request);
        }
      }
    }
    request = this.modifyRequest(request, this.access_token)
    return next.handle(request);
  }
  private async handleRedresh(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    var tokens = JSON.parse(await this.http.get(this.refreshUrl, {responseType: "text"}).toPromise());
    window.localStorage.setItem("access_token", tokens.access_token);
    this.access_token = window.localStorage.getItem("access_token") + "";
    req = this.modifyRequest(req, this.access_token)

    return next.handle(req).toPromise();
  }

  private modifyRequest(req: HttpRequest<any>, token: string) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });
    return req
  }


}
