import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';
import { articleActions } from 'src/app/store/actions/article.actions';
import { selectRouteNestedParam } from 'src/app/store/selectors/router.selectors';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';

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
    this.store.dispatch(articleActions.clearAllSelected());
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
