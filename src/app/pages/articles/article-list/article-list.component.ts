import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.title$.next('Articles');
    this.categoryListSubscription$ = this.store
      .select(selectRouteParams)
      .pipe(
        map((params: any) => {
          const categorySlug = params.category;
          const tagSlug = params.tag;
          this.store.dispatch(articleActions.startLoad());

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
          } else if (params.tag) {
            this.store
              .select(tagSelectors.getBySlug(tagSlug))
              .subscribe(tag => {
                if (tag) {
                  this.title$.next(`${tag.name.toUpperCase()}`);
                  this.store.dispatch(
                    articleActions.searchArticle({
                      searchParams: {
                        tag: tag.id,
                      },
                    })
                  );
                  this.articles$ = this.articlesSearch$;
                }
              });
          } else {
            this.articles$ = this.allArticles$;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.categoryListSubscription$?.unsubscribe();
  }
}

