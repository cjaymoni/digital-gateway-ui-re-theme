import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, filter, map, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit, OnDestroy {
  allArticles$ = this.store.select(articleSelectors.all);
  articlesSearch$ = this.store.select(articleSelectors.searchResults);

  articles$ = this.allArticles$;

  loadingArticles$ = this.store.select(articleSelectors.loading);

  categoryListSubscription$!: Subscription;

  title$ = new BehaviorSubject('');

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit(): void {
    this.title$.next('Articles');
    this.categoryListSubscription$ = this.store
      .select(selectRouteParams)
      .pipe(
        debounceTime(100),
        map((params: any) => {
          const categorySlug = params.category;

          if (params.category) {
            this.store
              .select(categorySelectors.getBySlug(categorySlug))
              .pipe(
                filter((cat: Category) => !!cat),
                map(category => {
                  this.title$.next(`${category.name.toUpperCase()}`);
                  this.store.dispatch(
                    articleActions.searchArticlesByCategory({
                      categoryId: category.id || 0,
                    })
                  );
                  this.articles$ = this.articlesSearch$;
                })
              )
              .subscribe();
          } else {
            this.articles$ = this.allArticles$;
          }
          // return of(noop);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.categoryListSubscription$?.unsubscribe();
  }
}
