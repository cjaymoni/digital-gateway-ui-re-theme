import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { ProfileTypeService } from 'src/app/services/profile-type.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { profileTypeActions } from '../actions/profile-type.actions';
import { ProfileType } from '../../models/user-auth.model';

@Injectable()
export class ProfileTypeEffects {
  loadProfileTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileTypeActions.fetch),
      switchMap(() =>
        this.profileTypeService.getResources().pipe(
          map((profileTypes: ProfileType[]) =>
            profileTypeActions.fetchSuccessful({
              profileTypes,
            })
          ),
          catchError(error => of(profileTypeActions.fetchError({ error })))
        )
      )
    )
  );

  addProfileTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileTypeActions.addProfileType),
      switchMap(({ profileType }) =>
        this.profileTypeService.storeResource(profileType).pipe(
          map((profileType: any) =>
            profileTypeActions.addProfileTypeSuccessful({
              profileType,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Profile Type added successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError(error => of(profileTypeActions.fetchError({ error })))
        )
      )
    )
  );

  deleteProfileType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileTypeActions.deleteProfileType),
      switchMap(({ id }) =>
        this.profileTypeService.deleteResource(id).pipe(
          map((profileType: any) =>
            profileTypeActions.deleteProfileTypeSuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Profile Type deleted successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(profileTypeActions.fetchError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileTypeService: ProfileTypeService,
    private alert: AppAlertService
  ) {}
}
