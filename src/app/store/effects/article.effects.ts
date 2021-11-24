import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { articleActions } from '../actions/article.actions';

@Injectable()
export class ArticleEffects {
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.fetch),
      switchMap(() =>
        this.articleService.getResources().pipe(
          map((articles: Article[]) =>
            articleActions.fetchSuccessful({
              articles,
            })
          ),
          catchError(() => of(articleActions.fetchError))
        )
      )
    )
  );

  searchArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.findAndSelectArticle),
      switchMap(({ searchParams }) =>
        this.articleService.searchArticle(searchParams).pipe(
          map((articles: Article[]) =>
            articleActions.selectArticle({
              article: articles?.[0],
            })
          ),
          catchError(() => of(articleActions.fetchError))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
