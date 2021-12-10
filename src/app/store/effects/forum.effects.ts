import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, debounceTime } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Forum } from 'src/app/models/forum.model';
import { ForumsService } from 'src/app/pages/forum/services/forums.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { forumActions } from '../actions/forum.actions';
import { slugify } from '../../helpers/app.helper.functions';

@Injectable()
export class ForumEffects {
  loadForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.fetch),
      debounceTime(500),
      switchMap(() =>
        this.forumService.getResources().pipe(
          map((forums: Forum[]) =>
            forumActions.fetchSuccessful({
              forums,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  searchForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.findAndSelectForum),
      debounceTime(500),
      switchMap(({ searchParams }) =>
        this.forumService.searchForum(searchParams).pipe(
          map((forums: Forum[]) =>
            forumActions.selectForum({
              forum: forums?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  searchForumById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.findAndSelectForumById),
      debounceTime(500),
      switchMap(({ id }) =>
        this.forumService.getOneResource(id).pipe(
          tap(forum => {
            this.store.dispatch(forumActions.selectForumToEdit({ forum }));
          }),
          map((forum: Forum) =>
            forumActions.selectForum({
              forum,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  searchAllForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.searchForum),
      debounceTime(500),
      switchMap(({ searchParams }) =>
        this.forumService.searchForum(searchParams).pipe(
          map((forums: Forum[]) =>
            forumActions.fetchSuccessful({
              forums,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );
  addForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.addForum),
      switchMap(({ forum }) =>
        this.forumService
          .addForum({ ...forum, slug: slugify(forum.name) })
          .pipe(
            map((savedForum: any) =>
              forumActions.addForumSuccessful({
                forum: savedForum,
              })
            ),
            tap(saved => this.showToast('Forum Saved Successfully')),
            catchError(error => {
              this.showError(error);
              return of(forumActions.fetchError);
            })
          )
      )
    )
  );

  editForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.editForum),
      switchMap(({ forum }) =>
        this.forumService.editForum(forum).pipe(
          map((updatedForum: any) =>
            forumActions.editForumSuccessful({
              updatedForum: {
                changes: updatedForum,
                id: updatedForum.id,
              },
            })
          ),
          tap(saved => this.showToast('Forum Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.comments.addComment),
      switchMap(({ comment }) =>
        this.forumService.postComment(comment).pipe(
          map((savedComment: any) =>
            forumActions.comments.addCommentSuccessful({
              comment: savedComment,
            })
          ),
          tap(saved => this.showToast('Comment Added Successfully')),
          catchError(error => {
            this.alert.showToast(
              'Error adding comment. Try again',
              PrimeNgAlerts.ERROR
            );
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  likeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.comments.likeComment),
      switchMap(({ id }) =>
        this.forumService.upvoteComment(id).pipe(
          map((_: any) =>
            forumActions.comments.likeCommentSuccessful({
              id,
            })
          ),
          catchError(error => {
            this.alert.showToast(
              'Error occured. Try again',
              PrimeNgAlerts.ERROR
            );
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  dislikeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.comments.dislikeComment),
      switchMap(({ id }) =>
        this.forumService.downvoteComment(id).pipe(
          map((_: any) =>
            forumActions.comments.dislikeCommentSuccessful({
              id,
            })
          ),
          catchError(error => {
            this.alert.showToast(
              'Error occurred. Try again',
              PrimeNgAlerts.ERROR
            );
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  likeForumPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.likePost),
      switchMap(({ id }) =>
        this.forumService.upvoteForumPost(id).pipe(
          map((_: any) =>
            forumActions.likePostSuccessful({
              id,
            })
          ),
          catchError(error => {
            this.alert.showToast(
              'Error occurred. Try again',
              PrimeNgAlerts.ERROR
            );
            return of(forumActions.fetchError);
          })
        )
      )
    )
  );

  dislikeForumPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.dislikePost),
      switchMap(({ id }) =>
        this.forumService.downvoteForumPost(id).pipe(
          map((_: any) =>
            forumActions.dislikePostSuccessful({
              id,
            })
          ),
          catchError(error => {
            this.alert.showToast(
              'Error occurred. Try again',
              PrimeNgAlerts.ERROR
            );
            return of(forumActions.fetchError);
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
    private forumService: ForumsService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
