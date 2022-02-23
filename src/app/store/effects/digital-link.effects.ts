import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { DigitalLinkService } from 'src/app/pages/digital-links/services/digital-link.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { digitalLinkActions } from '../actions/digital-link.actions';
import { DigitalLink } from 'src/app/models/digital-link.model';

@Injectable()
export class DigitalLinkEffects {
  loadDigitalLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(digitalLinkActions.fetch),
      switchMap(() =>
        this.digitalLinkService.getResources().pipe(
          map((digitalLink: DigitalLink[]) =>
            digitalLinkActions.fetchSuccessful({
              digitalLink,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(digitalLinkActions.fetchError);
          })
        )
      )
    )
  );

  searchDigitalLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(digitalLinkActions.findAndSelectDigitalLink),
      switchMap(({ searchParams }) =>
        this.digitalLinkService.searchDigitalLink(searchParams).pipe(
          map((digitalLink: DigitalLink[]) =>
            digitalLinkActions.selectDigitalLink({
              digitalLink: digitalLink?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(digitalLinkActions.fetchError);
          })
        )
      )
    )
  );

  searchDigitalLinkById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(digitalLinkActions.findAndSelectDigitalLinkById),
      switchMap(({ id }) =>
        this.digitalLinkService.getOneResource(id).pipe(
          tap(digitalLink => {
            this.store.dispatch(
              digitalLinkActions.selectDigitalLinkToEdit({ digitalLink })
            );
          }),
          map((digitalLink: DigitalLink) =>
            digitalLinkActions.selectDigitalLink({
              digitalLink,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(digitalLinkActions.fetchError);
          })
        )
      )
    )
  );

  addDigitalLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(digitalLinkActions.addDigitalLink),
      switchMap(({ digitalLink }) =>
        this.digitalLinkService.addDigitalLink(digitalLink).pipe(
          map((savedDigitalLink: any) =>
            digitalLinkActions.addDigitalLinkSuccessful({
              digitalLink: savedDigitalLink,
            })
          ),
          tap(saved => this.showToast('DigitalLink Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(digitalLinkActions.fetchError);
          })
        )
      )
    )
  );

  editDigitalLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(digitalLinkActions.editDigitalLink),
      switchMap(({ digitalLink }) =>
        this.digitalLinkService.editDigitalLink(digitalLink).pipe(
          map((updatedDigitalLink: any) =>
          digitalLinkActions.editDigitalLinkSuccessful({
              updatedDigitalLink: {
                changes: updatedDigitalLink,
                id: updatedDigitalLink.id,
              },
            })
          ),
          tap(saved => this.showToast('DigitalLink Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(digitalLinkActions.fetchError);
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
    private digitalLinkService: DigitalLinkService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
