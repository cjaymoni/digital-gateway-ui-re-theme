import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { APP_USER_TOKEN } from 'src/app/config/app-config';
import { userProfileActions } from '../../../store/actions/user-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class SelectUserProfileGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store, private cookieService: CookieService) {
    // this.store.dispatch(articleActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.cookieService.getObject(APP_USER_TOKEN) as any;
    if (user?.email) {
      this.store.dispatch(
        userProfileActions.findAndSelectUserProfileById({
          id: user?.profile?.id,
        })
      );
    }

    return true;
  }
}

