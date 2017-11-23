import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { CacheService } from '@ngx-utils/cache';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';

import { PlatformService } from '../../core/platform.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService, private platform: PlatformService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (this.platform.isBrowser() && this.cache.has(request.url)) {
      const response = new HttpResponse({
        body: this.cache.get(request.url),
        status: 200
      });
      return of(response).pipe(
        tap(() => this.cache.clear(request.url))
      );
    }

    return next.handle(request).pipe(
      tap((response: any) => {
        if (this.platform.isServer()) {
          this.cache.set(request.url, response.body);
        }
      })
    );
  }
}
