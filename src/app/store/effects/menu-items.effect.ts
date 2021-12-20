import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, take } from 'rxjs';
import { categoryActions } from '../actions/category.actions';
import { menuItemActions } from '../actions/menu-items.actions';

@Injectable()
export class MenuItemEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.fetchSuccessful),
      take(1),
      switchMap(({ categories }) => {
        return of(
          menuItemActions.fetchSuccessful({
            categories,
          })
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}
