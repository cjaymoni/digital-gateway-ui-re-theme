import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';
import { usersListActions } from 'src/app/store/actions/users-list.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersManagementGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(usersListActions.fetch());
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
        usersListActions.findAndSelectUserById({
          id: id,
        })
      );
    } else {
      this.store.dispatch(usersListActions.clearSelected());
    }
    return true;
  }
}
