import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/helpers/localstorage.service';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';
import { userProfileActions } from '../../../store/actions/user-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class SelectUserProfileGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store, private localStorage: LocalStorageService) {
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
    const profileId = JSON.parse(
      this.localStorage.getItem('app_user_access_token') || '{}'
    );

    return this.store.select(userAuthSelectors.loggedInUser).pipe(
      map(user => {
        this.store.dispatch(
          userProfileActions.findAndSelectUserProfileById({
            id: user?.id,
          })
        );

        return true;
      })
    );
  }
}
