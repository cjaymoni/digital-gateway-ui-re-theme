import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { productTypeActions } from 'src/app/store/actions/product-type.actions';
import { productTypeSelectors } from 'src/app/store/selectors/product-type.selectors';

@Injectable({
  providedIn: 'root',
})
export class MarketPlaceGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(productAdActions.fetch());
    this.store.dispatch(productTypeActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
