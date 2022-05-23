import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { multimediaActions } from 'src/app/store/actions/multimedia.actions';

@Injectable({
  providedIn: 'root',
})
export class MultimediaManagementGuard implements CanActivate {
  constructor(private store: Store) {
    this.store.dispatch(multimediaActions.fetch());
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
        multimediaActions.findAndSelectMultiMediaById({
          id,
        })
      );
    } else {
      this.store.dispatch(multimediaActions.clearAllSelected());
    }

    return true;
  }
}

