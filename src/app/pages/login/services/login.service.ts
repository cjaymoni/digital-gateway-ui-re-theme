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

@Injectable({
  providedIn: 'root',
})
export class LoginService implements IAuthService {
  constructor(private http: HttpClient, private store: Store) {
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
    if (!localStorage.getItem(APP_USER_TOKEN)) return null;
    return JSON.parse(localStorage.getItem(APP_USER_TOKEN) || '{}');
  }

  login(data: any): Observable<boolean> {
    return this.http.post(LoginEndpoint, data).pipe(
      map((response: any) => {
        response = response;
        localStorage.setItem(APP_TOKEN, response.access);
        localStorage.setItem(APP_REFRESH_TOKEN, response.refresh);
        localStorage.setItem(APP_USER_TOKEN, JSON.stringify(response.user));

        if (response.user) {
          this.store.dispatch(
            userAuthActions.loginSuccessful({ user: response.user })
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
        refresh: localStorage.getItem(APP_REFRESH_TOKEN),
      })
      .pipe(
        map(_ => {
          localStorage.removeItem(APP_TOKEN);
          localStorage.removeItem(APP_USER_TOKEN);
          localStorage.removeItem(APP_REFRESH_TOKEN);
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
}
