import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { SocialMediaService } from 'src/app/pages/app-settings/pages/social-media-settings/services/social-media.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { socialmediaActions } from '../actions/socialmedia.actions';
import { SocialMedia } from 'src/app/models/social-media.model';

@Injectable()
export class SocialMediaEffects {
  loadSocialMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(socialmediaActions.fetch),
      switchMap(() =>
        this.socialmediaService.getResources().pipe(
          map((socialmedia: SocialMedia[]) =>
            socialmediaActions.fetchSuccessful({
              socialmedia,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(socialmediaActions.fetchError);
          })
        )
      )
    )
  );

  searchSocialMediaById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(socialmediaActions.findAndSelectSocialMediaById),
      switchMap(({ id }) =>
        this.socialmediaService.getOneResource(id).pipe(
          tap(socialmedia => {
            this.store.dispatch(
              socialmediaActions.selectSocialMediaToEdit({ socialmedia })
            );
          }),
          map((socialmedia: SocialMedia) =>
          socialmediaActions.selectSocialMedia({
            socialmedia,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(socialmediaActions.fetchError);
          })
        )
      )
    )
  );

  addSocialMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(socialmediaActions.addSocialMedia),
      switchMap(({ socialmedia }) =>
        this.socialmediaService.storeResource(socialmedia).pipe(
          map((socialmedia: any) =>
            socialmediaActions.addSocialMediaSuccessful({
              socialmedia,
            })
          ),
          tap(saved => this.showToast('Socialmedia Saved Successfully')),
          catchError(error => of(socialmediaActions.fetchError(error)))
        )
      )
    )
  );

  editSocialMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(socialmediaActions.editSocialMedia),
      switchMap(({ socialmedia }) =>
        this.socialmediaService.editSocialMedia(socialmedia).pipe(
          map((updatedSocialMedia: any) =>
            socialmediaActions.editSocialMediaSuccessful({
              updatedSocialMedia: {
                changes: updatedSocialMedia,
                id: updatedSocialMedia.id,
              },
            })
          ),
          tap(saved => this.showToast('SocialMedia Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(socialmediaActions.fetchError);
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
    private socialmediaService: SocialMediaService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
