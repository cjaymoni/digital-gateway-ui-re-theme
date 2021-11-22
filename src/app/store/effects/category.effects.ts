import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { categoryActions } from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.fetch),
      switchMap(() =>
        this.categoryService.getResources().pipe(
          map((categories: Category[]) =>
            categoryActions.fetchSuccessful({
              categories,
            })
          ),
          catchError(() => of(categoryActions.fetchError))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
