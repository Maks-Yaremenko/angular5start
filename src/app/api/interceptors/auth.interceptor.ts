import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookiesService } from '@ngx-utils/cookies';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookies: CookiesService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.cookies.get('accessToken')}`
      }
    });
    return next.handle(request);
  }
}
