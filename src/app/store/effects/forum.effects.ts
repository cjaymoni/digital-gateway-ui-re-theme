import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Forum } from 'src/app/models/forum.model';
import { ForumsService } from 'src/app/pages/forum/services/forums.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { forumActions } from '../actions/forum.actions';

@Injectable()
export class ForumEffects {
  loadForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.fetch),
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

  addForums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forumActions.addForum),
      switchMap(({ forum, imageToUpload }) =>
        this.forumService.addForum(forum, imageToUpload).pipe(
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
      switchMap(({ forum, imageToUpload }) =>
        this.forumService.editForum(forum, imageToUpload).pipe(
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
    private alert: AppAlertService
  ) {}
}
