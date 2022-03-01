import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { map, Observable, take } from 'rxjs';
import {
  APP_USER_TOKEN,
  PrimeNgAlerts,
  Roles,
  RouterOutlets,
} from '../config/app-config';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';
import { userAuthSelectors } from '../store/selectors/user-auth.selectors';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private store: Store,
    private alert: AppAlertService,
    private navigator: NavigatorService,
    private cookieService: CookieService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const neededRoles: Roles[] = route.data['roles'];

    return this.store.select(userAuthSelectors.loggedInUser).pipe(
      take(1),
      map(user => {
        if (user == null) {
          // check from cookie
          user = this.cookieService.getObject(APP_USER_TOKEN) as any;
        }

        if (user) {
          const role = user?.role;

          if (!neededRoles) {
            return true;
          }

          if (neededRoles.includes(role)) {
            return true;
          }
          this.alert.showToast(
            "Sorry you don't have enough permission to access this resource"
          );
          return false;
        } else {
          this.alert.showToast('You need to login', PrimeNgAlerts.UNOBSTRUSIVE);
          this.navigator.auth.goToLogin(
            RouterOutlets.Modal,
            undefined,
            state.url
          );
          return false;
        }
      })
    );
  }
}
