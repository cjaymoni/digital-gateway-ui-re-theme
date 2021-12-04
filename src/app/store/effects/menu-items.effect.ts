import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MenuItem } from 'primeng/api';
import { of, switchMap } from 'rxjs';
import { categoryActions } from '../actions/category.actions';
import { menuItemActions } from '../actions/menu-items.actions';

@Injectable()
export class MenuItemEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.fetchSuccessful),
      switchMap(({ categories }) => {
        // const menuItemsForInfoHub = [...categories];
        // console.log(menuItemsForInfoHub);

        return of(
          menuItemActions.fetchSuccessful({
            menuItems: categories as MenuItem[],
          })
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}
