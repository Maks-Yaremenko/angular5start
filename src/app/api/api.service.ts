import { Injectable } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  public currentUser: any;
  public get accessToken(): string {
    return this.cookies.get('accessToken');
  }

  public set accessToken(value: string | null) {
    if (typeof value === 'string') {
      this.cookies.put('accessToken', value);
    } else {
      this.cookies.remove('accessToken');
    }
  }

  public get isAuthenticated(): boolean {
    return Boolean(this.accessToken);
  }

  private loadInProgress= false;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private currentUserObservable: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private cookies: CookiesService, private http: HttpClient) {
    this.getCurrentUser();
  }

  public clearUser() {
    this.accessToken = null;
    this.currentUser = undefined;
  }

  public getCurrentUser(): Observable<any> {
    if (!this.currentUser && this.isAuthenticated && !this.loadInProgress) {
      this.loadInProgress = true;
      this.getAuthenticatedUser()
        .subscribe((userData: any) => {
          this.currentUser = userData;
          this.currentUserSubject.next(this.currentUser);
        });
    }
    return this.currentUserObservable;
  }

  public login(data) {
    const url = 'https://api.cosmunity.com/v2/users/login?include=user';
    if (-1 === data.email.indexOf('@')) {
      data.username = data.email;
      delete data.email;
    }
    return this.http
      .post(url, data)
      .pipe(
        tap((response: any) => {
          this.setUser(response, response.accessToken.id);
        })
      );
  }

  public logout() {
    const url = 'https://api.cosmunity.com/v2/users/logout';
    if (this.isAuthenticated) {
      return this.http
        .post(url, null)
        .subscribe(() => {
          this.clearUser();
        }, () => this.clearUser());
    } else {
      this.clearUser();
    }
  }

  public setUser(userData, accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
    }
    this.currentUser = Object.assign({}, this.currentUser, userData);
    this.currentUserSubject.next(this.currentUser);
  }

  public getAuthenticatedUser() {
    const url = 'https://api.cosmunity.com/v2/users/authenticated';
    return this
      .http
      .get(url)
      .pipe(
        tap((user) => {
          this.currentUser = {};
          this.setUser(user, this.accessToken);
        })
      );
  }


}
