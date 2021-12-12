import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { ForumPost } from 'src/app/models/forum.model';
import { ForumPostsService } from 'src/app/pages/forum-posts/services/forum-post.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { forumPostActions } from '../actions/forum-post.action';
import { slugify } from '../../helpers/app.helper.functions';

@Injectable()
export class ForumPostEffects {
  loadForumPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.fetch),
      switchMap(() =>
        this.forumPostService.getResources().pipe(
          map((forumPosts: ForumPost[]) =>
            forumPostActions.fetchSuccessful({
              forumPosts,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumPostActions.fetchError);
          })
        )
      )
    )
  );

  searchForumPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.findAndSelectForumPost),
      switchMap(({ searchParams }) =>
        this.forumPostService.searchForumPost(searchParams).pipe(
          map((forumPosts: ForumPost[]) =>
            forumPostActions.selectForumPost({
              forumPost: forumPosts?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumPostActions.fetchError);
          })
        )
      )
    )
  );

  searchForumPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.findAndSelectForumPostById),
      switchMap(({ id }) =>
        this.forumPostService.getOneResource(id).pipe(
          tap(forumPost => {
            this.store.dispatch(
              forumPostActions.selectForumPostToEdit({ forumPost })
            );
          }),
          map((forumPost: ForumPost) =>
            forumPostActions.selectForumPost({
              forumPost,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumPostActions.fetchError);
          })
        )
      )
    )
  );

  searchAllForumPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.searchForumPost),
      switchMap(({ searchParams }) =>
        this.forumPostService.searchForumPost(searchParams).pipe(
          map((forumPosts: ForumPost[]) =>
            forumPostActions.fetchSuccessful({
              forumPosts,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(forumPostActions.fetchError);
          })
        )
      )
    )
  );

  addForumPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.addForumPost),
      switchMap(({ forumPost, imageToUpload }) =>
        this.forumPostService
          .addForumPost(
            { ...forumPost, slug: slugify(forumPost.title) },
            imageToUpload
          )
          .pipe(
            map((savedForumPost: any) =>
              forumPostActions.addForumPostSuccessful({
                forumPost: savedForumPost,
              })
            ),
            tap(saved => this.showToast('Forum Post Saved Successfully')),
            catchError(error => {
              this.showError(error);
              return of(forumPostActions.fetchError);
            })
          )
      )
    )
  );

  editForumPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumPostActions.editForumPost),
      switchMap(({ forumPost, imageToUpload }) =>
        this.forumPostService.editForumPost(forumPost, imageToUpload).pipe(
          map((updatedForumPost: any) =>
            forumPostActions.editForumPostSuccessful({
              updatedForumPost: {
                changes: updatedForumPost,
                id: updatedForumPost.id,
              },
            })
          ),
          tap(saved => this.showToast('Forum Post Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(forumPostActions.fetchError);
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
    private forumPostService: ForumPostsService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
