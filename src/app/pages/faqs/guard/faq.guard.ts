import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faqActions } from 'src/app/store/actions/faq.actions';

@Injectable({
  providedIn: 'root',
})
export class FaqGuard implements CanActivate {
  constructor(private store: Store) {
    this.store.dispatch(faqActions.fetch());
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
        faqActions.findAndSelectFaqById({
          id: id,
        })
      );
    } else {
      this.store.dispatch(faqActions.clearAllSelected());
    }

    return true;
  }
}

