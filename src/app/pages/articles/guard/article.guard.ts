import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, take, tap } from 'rxjs';
import { SLUG_PREFIX } from 'src/app/config/app-config';
import { Category } from 'src/app/models/category.model';
import { articleActions } from 'src/app/store/actions/article.actions';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import {
  selectRouteNestedParam,
  selectRouteNestedParams,
  selectRouteParam,
  selectRouteParams,
} from 'src/app/store/selectors/router.selectors';

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
    this.store
      .select(selectRouteNestedParam('article-id'))
      .pipe(
        filter(d => !!d),
        tap(articleId => {
          this.store.dispatch(
            articleActions.findAndSelectArticleById({
              id: articleId,
            })
          );
        })
      )
      .subscribe();

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
