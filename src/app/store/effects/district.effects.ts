import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { District } from 'src/app/models/district.model';
import { DistrictService } from 'src/app/services/district.service';
import { districtActions } from '../actions/district.actions';

@Injectable()
export class DistrictEffects {
  loadDistricts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(districtActions.fetch),
      switchMap(() =>
        this.districtService.getResources().pipe(
          map((districts: District[]) =>
            districtActions.fetchSuccessful({
              districts,
            })
          ),
          catchError(() => of(districtActions.fetchError))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private districtService: DistrictService
  ) {}
}
