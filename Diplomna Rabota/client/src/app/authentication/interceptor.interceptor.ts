import {Injectable} from '@angular/core';
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
  private refreshUrl = environment.apiUrl + "user/token/refresh";
  private loginUrl: string = environment.loginUrl;

  private access_token: string | null = "";
  private refresh_token: string | null = "";

  constructor(private router: Router, private tokenService: TokensService, private http: HttpClient) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.access_token = this.tokenService.getAccessToken();
    this.refresh_token = this.tokenService.getRefreshToken();

    if (environment.urlsToSkip.includes(request.url.replace(environment.apiUrl, "")) || request.url == environment.loginUrl) {
      console.log("skiped interceptor")
      return next.handle(request);
    }

    if (this.accessTokenInvalid()) {
      if (this.refreshTokenInvalid()) {
        // both access and refresh token are expired hance we need to redirect to login
        // this.router.navigate(['/login']).catch(console.error)
        console.log("login")
        return EMPTY;
      } else {
        //check if request isnt to refresh the token or we will end up with cycle
        if (request.url != this.refreshUrl) {
          return from(this.handleRefresh(request, next));
        } else {
          request = this.modifyRequest(request, this.refresh_token)
          return next.handle(request);
        }
      }
    }
    //if both tokens are fine we simply add the access token
    request = this.modifyRequest(request, this.access_token)
    return next.handle(request);
  }

  private async handleRefresh(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    //get new access token from refresh token, since its expired but refresh isn't
    var tokens = JSON.parse(await this.http.get(this.refreshUrl, {responseType: "text"}).toPromise());
    this.tokenService.saveAccessToken(tokens.access_token);
    this.access_token = this.tokenService.getAccessToken();
    //after getting the new token from the refresh token we continue with the initial request but with the new token
    req = this.modifyRequest(req, this.access_token)

    return next.handle(req).toPromise();
  }
  //we do check if token is null or invalid before calling this method so accepting any type is safe here
  private modifyRequest(req: HttpRequest<any>, token: any) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });
    return req
  }

  accessTokenInvalid(): Boolean {
    return this.access_token == null || this.tokenService.tokenExpired(this.access_token)
  }

  refreshTokenInvalid(): Boolean {
    return this.refresh_token == null || this.tokenService.tokenExpired(this.refresh_token)
  }
}
