import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { articleActions } from 'src/app/store/actions/article.actions';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';

@Injectable({
  providedIn: 'root',
})
export class LandingPageGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(articleActions.fetch());
    this.store.dispatch(productAdActions.fetch());
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
