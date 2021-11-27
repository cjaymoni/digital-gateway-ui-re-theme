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
          catchError(error => of(articleActions.fetchError({ error })))
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
          catchError(error => of(articleActions.fetchError({ error })))
        )
      )
    )
  );

  addArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addArticle),
      switchMap(({ article, imageToUpload }) =>
        this.articleService.addArticle(article, imageToUpload).pipe(
          map((savedArticle: any) =>
            articleActions.addArticleSuccessful({
              article: savedArticle,
            })
          ),
          catchError(error => of(articleActions.fetchError({ error })))
        )
      )
    )
  );

  editArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.editArticle),
      switchMap(({ article, imageToUpload }) =>
        this.articleService.editArticle(article, imageToUpload).pipe(
          map((updatedArticle: any) =>
            articleActions.editArticleSuccessful({
              updatedArticle: {
                changes: updatedArticle,
                id: updatedArticle.id,
              },
            })
          ),
          catchError(error => of(articleActions.fetchError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
