import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { partnersActions } from 'src/app/store/actions/partners.actions';

@Injectable({
  providedIn: 'root',
})
export class PartnersGuard implements CanActivate {
  constructor(private store: Store) {
    this.store.dispatch(partnersActions.fetch());
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
        partnersActions.findAndSelectPartnerById({
          id: id
        })
      );
    } else {
      this.store.dispatch(partnersActions.clearAllSelected());
    }

    return true;
  }
}
