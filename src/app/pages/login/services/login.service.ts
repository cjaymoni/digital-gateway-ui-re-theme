import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { LoginEndpoint } from 'src/app/config/routes';
import { APP_TOKEN, APP_USER_TOKEN } from 'src/app/config/app-config';
import { IAuthService } from 'src/app/models/auth-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements IAuthService {
  constructor(private http: HttpClient) { }

  setUpUser(){
  }
  redirect: string =  "/user-profile";

  userCan(permission: string[]): boolean {
    return this.loggedInUser && this.loggedInUser.permission.length >0 &&
    this.loggedInUser.permission.some((p:any) => permission.includes(p));
  }

  token!: string;

  get loggedInUser() : any {
    if (!localStorage.getItem(APP_USER_TOKEN))
      return null;
    return JSON.parse(localStorage.getItem(APP_USER_TOKEN) || '{}')
  }

  login(data: any): Observable<boolean> {
    return this.http.post(`${environment.API_URL}login`, data).pipe(
      map((response:any) => {
        response= response;
        localStorage.setItem(APP_TOKEN, response.token);
        localStorage.setItem(APP_USER_TOKEN, response.user);

        if(response.user){
          return true;
        }
        else {
          return false;
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post(`${environment.API_URL}logout`,{}).pipe(
      map(_ => {
        localStorage.removeItem(APP_TOKEN);
        localStorage.removeItem(APP_USER_TOKEN);
        return true;
      })
    )
  }

  requestPasswordReset(emailAdd?:string): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/forgotPassword`,{
      email: emailAdd || this.loggedInUser.email
    });
  }

  resetPassword(credentials: { email: string; token: string; password: string }): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/resetPassword`, {...credentials, password_confirmation: credentials.password});
  }
}
