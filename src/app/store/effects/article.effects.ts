import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
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
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
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
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
        )
      )
    )
  );

  searchArticleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.findAndSelectArticleById),
      switchMap(({ id }) =>
        this.articleService.getOneResource(id).pipe(
          tap(article => {
            this.store.dispatch(
              articleActions.selectArticleToEdit({ article })
            );
          }),
          map((article: Article) =>
            articleActions.selectArticle({
              article,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
        )
      )
    )
  );

  searchAllArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.searchArticle),
      switchMap(({ searchParams }) =>
        this.articleService.searchArticle(searchParams).pipe(
          map((articles: Article[]) =>
            articleActions.fetchSuccessful({
              articles,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
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
          tap(saved => this.showToast('Article Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
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
          tap(saved => this.showToast('Article Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(articleActions.fetchError);
          })
        )
      )
    )
  );

  private showToast(message: string) {
    this.alert.showToast(message, PrimeNgAlerts.UNOBSTRUSIVE);
  }

  private showError(error: any) {
    this.alert.showToast(
      'An error occurred. Rest assured we will fix it',
      PrimeNgAlerts.ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
