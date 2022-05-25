import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { socialmediaActions } from 'src/app/store/actions/socialmedia.actions';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaGuard implements CanActivate {
  constructor(private store: Store) {
    this.store.dispatch(socialmediaActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = route.params?.['id'];
    const idExists = Boolean(id);

    if (idExists) {
      this.store.dispatch(
        socialmediaActions.findAndSelectSocialMediaById({
          id: id
        })
      );
    } else {
      this.store.dispatch(socialmediaActions.clearAllSelected());
    }

    return true;
  }
}
