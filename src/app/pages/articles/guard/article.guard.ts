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
export class ArticleGuard implements CanActivate {
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
    const shouldFetchArticle = route.data['fetch'];
    const search = route.queryParams['search'];
    const id = route.queryParams['id'];

    if (search) {
      this.store.dispatch(
        articleActions.searchArticle({
          searchParams: {
            category: id,
          },
        })
      );
    }

    if (shouldFetchArticle) {
      // search backend using the slug
      const slug = route.url[0].path;

      this.store.dispatch(
        articleActions.findAndSelectArticle({
          searchParams: { slug },
        })
      );
    }
    return true;
  }
}
