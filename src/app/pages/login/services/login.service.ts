import { userAuthActions } from './../../../store/actions/user-auth.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {
  APP_TOKEN,
  APP_USER_TOKEN,
  APP_REFRESH_TOKEN,
} from 'src/app/config/app-config';
import { IAuthService } from 'src/app/models/auth-service';
import { Store } from '@ngrx/store';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { LoginEndpoint, LogoutEndpoint } from 'src/app/config/routes';
import { LocalStorageService } from 'src/app/helpers/localstorage.service';

import { CookieService } from 'ngx-cookie';
import { UserManagementService } from '../../users-management/services/users-management.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements IAuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private localStorage: LocalStorageService,
    private cookieService: CookieService,
    private userManagementService: UserManagementService
  ) {
    // this.setUpUser()
  }

  setUpUser() {
    this.loggedInUser
      ? this.store.dispatch(
          userAuthActions.loginSuccessful({ user: this.loggedInUser })
        )
      : null;
  }

  token!: string;

  get loggedInUser(): any {
    if (!this.cookieService.getObject(APP_USER_TOKEN)) return null;
    return this.cookieService.getObject(APP_USER_TOKEN) || {};
  }

  login(data: any): Observable<boolean> {
    return this.http.post(LoginEndpoint, data).pipe(
      map((response: any) => {
        response = response;
        this.localStorage.setItem(APP_TOKEN, response.access);
        this.cookieService.put(APP_TOKEN, response.access);
        this.localStorage.setItem(APP_REFRESH_TOKEN, response.refresh);
        this.cookieService.put(APP_REFRESH_TOKEN, response.refresh);

        this.localStorage.setItem(
          APP_USER_TOKEN,
          JSON.stringify(response.user)
        );

        this.cookieService.putObject(APP_USER_TOKEN, response.user);

        if (response.user) {
          this.fetchUserDetails().subscribe(user =>
            this.store.dispatch(userAuthActions.loginSuccessful({ user }))
          );

          this.store.dispatch(forumActions.fetch());
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http
      .post(LogoutEndpoint, {
        refresh: this.localStorage.getItem(APP_REFRESH_TOKEN),
      })
      .pipe(
        map(_ => {
          this.localStorage.removeItem(APP_TOKEN);
          this.localStorage.removeItem(APP_USER_TOKEN);
          this.localStorage.removeItem(APP_REFRESH_TOKEN);

          this.cookieService.removeAll();

          this.store.dispatch(userAuthActions.logoutSuccessful());
          this.store.dispatch(forumActions.fetch());
          return true;
        })
      );
  }

  requestPasswordReset(emailAdd?: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/forgotPassword`, {
      email: emailAdd || this.loggedInUser.email,
    });
  }

  resetPassword(credentials: {
    email: string;
    token: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/resetPassword`, {
      ...credentials,
      password_confirmation: credentials.password,
    });
  }

  fetchUserDetails() {
    return this.userManagementService.getMyDetails().pipe(
      map(user => {
        this.localStorage.setItem(APP_USER_TOKEN, JSON.stringify(user));
        this.cookieService.putObject(APP_USER_TOKEN, user);
        return user;
      })
    );
  }
}

