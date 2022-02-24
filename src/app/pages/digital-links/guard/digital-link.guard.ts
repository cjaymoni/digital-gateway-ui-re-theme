import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { digitalLinkActions } from 'src/app/store/actions/digital-link.actions';

@Injectable({
  providedIn: 'root',
})
export class DigitalLinkGuard implements CanActivate {
  constructor(private store: Store) {
    this.store.dispatch(digitalLinkActions.fetch());
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
        digitalLinkActions.findAndSelectDigitalLink({
          searchParams: {
            multimedia: id,
          },
        })
      );
    } else {
      this.store.dispatch(digitalLinkActions.clearAllSelected());
    }

    return true;
  }
}
