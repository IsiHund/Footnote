import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //when Token is not set and the url is not one of the urls which needs no token, then add the token as header to the request
    if (this.auth.getToken() != null && !request.url.includes("rest/auth") && !request.url.includes("rest/json") && !request.url.includes("rest/user/register")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }

}
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class InterceptorModule { }