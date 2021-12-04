import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SLUG_PREFIX } from 'src/app/config/app-config';
import { articleActions } from 'src/app/store/actions/article.actions';

@Injectable({
  providedIn: 'root',
})
export class SelectArticleGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(articleActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const articleId = route.url[0].path.split(':')[1];
    this.store.dispatch(
      articleActions.findAndSelectArticleById({
        id: articleId,
      })
    );

    return true;
  }
}
