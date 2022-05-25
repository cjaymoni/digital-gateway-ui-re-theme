import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { PartnersService } from 'src/app/pages/partners/services/partners.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { partnersActions } from '../actions/partners.actions';
import { IPartners } from 'src/app/models/partners.model';

@Injectable()
export class PartnersEffects {
  loadpartners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.fetch),
      switchMap(() =>
        this.PartnersService.getResources().pipe(
          map((partners: IPartners[]) =>
            partnersActions.fetchSuccessful({
              partners,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(partnersActions.fetchError);
          })
        )
      )
    )
  );

  searchPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.findAndSelectPartner),
      switchMap(({ searchParams }) =>
        this.PartnersService.searchPartner(searchParams).pipe(
          map((partners: IPartners[]) =>
            partnersActions.selectPartner({
              partners: partners?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(partnersActions.fetchError);
          })
        )
      )
    )
  );

  searchPartnerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.findAndSelectPartnerById),
      switchMap(({ id }) =>
        this.PartnersService.getOneResource(id).pipe(
          tap(partners => {
            this.store.dispatch(
              partnersActions.selectPartnerToEdit({ partners })
            );
          }),
          map((partners: IPartners) =>
            partnersActions.selectPartner({
              partners,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(partnersActions.fetchError);
          })
        )
      )
    )
  );

  addPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.addPartner),
      switchMap(({ partners, imageToUpload }) =>
        this.PartnersService.addPartner(partners, imageToUpload).pipe(
          map((savedPartner: any) =>
            partnersActions.addPartnerSuccessful({
              partners: savedPartner,
            })
          ),
          tap(saved => this.showToast('Partners Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(partnersActions.fetchError);
          })
        )
      )
    )
  );

  editPartners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.editPartner),
      switchMap(({ partners, imageToUpload }) =>
        this.PartnersService.editPartner(partners, imageToUpload).pipe(
          map((updatedPartner: any) =>
          partnersActions.editPartnerSuccessful({
            updatedPartner: {
                changes: updatedPartner,
                id: updatedPartner.id,
              },
            })
          ),
          tap(saved => this.showToast('Partners Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(partnersActions.fetchError);
          })
        )
      )
    )
  );

  deletePartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(partnersActions.deletePartner),
      switchMap(({ id }) =>
        this.PartnersService.deleteResource(id).pipe(
          map((partner: any) =>
            partnersActions.deletePartnerSuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Partner delete successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(partnersActions.fetchError(error)))
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
    private PartnersService: PartnersService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
