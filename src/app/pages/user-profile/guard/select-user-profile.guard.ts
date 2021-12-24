import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';
import { userProfileActions } from '../../../store/actions/user-profile.actions';

@Injectable({
  providedIn: 'root',
})
export class SelectUserProfileGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
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
    const profileId = JSON.parse(localStorage['app_user_access_token']);

    // route.url[0].path.split(':')[1];
    // this.store
    //   .select(selectRouteParams)
    //   .pipe(tap(rp => console.log(rp)))
    //   .subscribe();

    this.store.dispatch(
      userProfileActions.findAndSelectUserProfileById({
        id: profileId.id,
      })
    );

    return true;
  }
}
