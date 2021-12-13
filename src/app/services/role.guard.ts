import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Roles } from '../config/app-config';
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
    private navigator: NavigatorService
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
      map(user => {
        if (user) {
          const role = user?.role;

          if (neededRoles.includes(role)) {
            return true;
          }
          this.alert.showToast(
            "Sorry you don't have enough permission to access this resource"
          );
          return false;
        }
        this.alert.showToast('You need to login');
        this.navigator.auth.goToLogin();
        return false;
      })
    );
  }
}
