import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { tagActions } from '../actions/tag.actions';

@Injectable()
export class TagEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.fetch),
      switchMap(() =>
        this.tagService.getResources().pipe(
          map((tags: Tag[]) =>
            tagActions.fetchSuccessful({
              tags,
            })
          ),
          catchError(error => of(tagActions.fetchError(error)))
        )
      )
    )
  );

  addTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.addTag),
      switchMap(({ tag }) =>
        this.tagService.storeResource(tag).pipe(
          map((tag: any) =>
            tagActions.addTagSuccessful({
              tag,
            })
          ),
          tap(_ => this.showAlert('Tag added successfully')),
          catchError(error => of(tagActions.fetchError(error)))
        )
      )
    )
  );

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tagActions.deleteTag),
      switchMap(({ id }) =>
        this.tagService.deleteResource(id).pipe(
          map((tag: any) =>
            tagActions.deleteTagSuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Tag delete successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(tagActions.fetchError(error)))
        )
      )
    )
  );

  private showAlert(message: string) {
    this.alert.showToast(message, PrimeNgAlerts.SUCCESS);
  }

  constructor(
    private actions$: Actions,
    private tagService: TagService,
    private alert: AppAlertService
  ) {}
}
