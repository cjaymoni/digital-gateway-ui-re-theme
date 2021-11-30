import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductType } from 'src/app/models/product-ad.model';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { productTypeActions } from '../actions/product-type.actions';

@Injectable()
export class ProductTypeEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productTypeActions.fetch),
      switchMap(() =>
        this.productTypeService.getResources().pipe(
          map((productTypes: ProductType[]) =>
            productTypeActions.fetchSuccessful({
              productTypes,
            })
          ),
          catchError(error => of(productTypeActions.fetchError({ error })))
        )
      )
    )
  );

  addTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productTypeActions.addProductType),
      switchMap(({ productType }) =>
        this.productTypeService.storeResource(productType).pipe(
          map((productType: any) =>
            productTypeActions.addProductTypeSuccessful({
              productType,
            })
          ),
          catchError(error => of(productTypeActions.fetchError({ error })))
        )
      )
    )
  );

  addProductTypeSuccessful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productTypeActions.fetch),
      switchMap(() =>
        this.productTypeService.getResources().pipe(
          map((productTypes: ProductType[]) =>
            productTypeActions.fetchSuccessful({
              productTypes,
            })
          ),
          catchError(error => of(productTypeActions.fetchError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productTypeService: ProductTypeService
  ) {}
}
