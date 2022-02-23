import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
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

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.addCategory),
      switchMap(({ category, imageToUpload }) =>
        this.categoryService.addCategory(category, imageToUpload).pipe(
          map((category: any) =>
            categoryActions.addCategorySuccessful({
              category,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Category added successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError(error => of(categoryActions.fetchError(error)))
        )
      )
    )
  );

  editCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.editCategory),
      switchMap(({ category, imageToUpload }) =>
        this.categoryService.editCategory(category, imageToUpload).pipe(
          map((category: any) =>
            categoryActions.editCategorySuccessful({
              updatedCategory: {
                changes: category,
                id: category.id,
              },
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Category edited successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError(error => of(categoryActions.fetchError(error)))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoryActions.deleteCategory),
      switchMap(({ id }) =>
        this.categoryService.deleteResource(id).pipe(
          map((category: any) =>
            categoryActions.deleteCategorySuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Category deleted successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(categoryActions.fetchError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private alert: AppAlertService
  ) {}
}
