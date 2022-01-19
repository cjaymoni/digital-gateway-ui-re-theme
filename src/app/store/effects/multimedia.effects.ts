import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { MultiMediaService } from 'src/app/pages/multimedia-management/services/multimedia-management.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { multimediaActions } from '../actions/multimedia.actions';
import { MultiMedia } from '../../models/multimedia.model';

@Injectable()
export class MultiMediaEffects {
  loadMultiMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multimediaActions.fetch),
      switchMap(() =>
        this.multimediaService.getResources().pipe(
          map((multimedia: MultiMedia[]) =>
            multimediaActions.fetchSuccessful({
              multimedia,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(multimediaActions.fetchError);
          })
        )
      )
    )
  );

  searchMultiMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multimediaActions.findAndSelectMultiMedia),
      switchMap(({ searchParams }) =>
        this.multimediaService.searchMultiMedia(searchParams).pipe(
          map((multimedia: MultiMedia[]) =>
            multimediaActions.selectMultiMedia({
              multimedia: multimedia?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(multimediaActions.fetchError);
          })
        )
      )
    )
  );

  searchMultiMediaById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multimediaActions.findAndSelectMultiMediaById),
      switchMap(({ id }) =>
        this.multimediaService.getOneResource(id).pipe(
          tap(multimedia => {
            this.store.dispatch(
              multimediaActions.selectMultiMediaToEdit({ multimedia })
            );
          }),
          map((multimedia: MultiMedia) =>
            multimediaActions.selectMultiMedia({
              multimedia,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(multimediaActions.fetchError);
          })
        )
      )
    )
  );

  addMultiMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multimediaActions.addMultiMedia),
      switchMap(({ multimedia }) =>
        this.multimediaService.addMultiMedia(multimedia).pipe(
          map((savedMultimedia: any) =>
            multimediaActions.addMultiMediaSuccessful({
              multimedia: savedMultimedia,
            })
          ),
          tap(saved => this.showToast('Multimedia Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(multimediaActions.fetchError);
          })
        )
      )
    )
  );

  editMultiMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(multimediaActions.editMultiMedia),
      switchMap(({ multimedia }) =>
        this.multimediaService.editMultiMedia(multimedia).pipe(
          map((updatedMultiMedia: any) =>
            multimediaActions.editMultiMediaSuccessful({
              updatedMultiMedia: {
                changes: updatedMultiMedia,
                id: updatedMultiMedia.id,
              },
            })
          ),
          tap(saved => this.showToast('MultiMedia Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(multimediaActions.fetchError);
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
    private multimediaService: MultiMediaService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
