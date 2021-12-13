import { Observable } from "rxjs";

export interface IAuthService {
  loggedInUser: any;
  token: string;
  login(credentials: {username: string; password: string}): Observable<boolean>;
  logout(): Observable<boolean>;
  userCan(permission: string[]): boolean;
  redirect: string;
  setUpUser: ()=>void
  // requestPasswordReset: (any)=>Observable<any>;
  // resetPassword: (any)=>Observable<any>;

}
