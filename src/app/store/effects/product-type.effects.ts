import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { ProductType } from 'src/app/models/product-ad.model';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
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
          tap(_ =>
            this.alert.showToast(
              'Product Type added successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError(error => of(productTypeActions.fetchError({ error })))
        )
      )
    )
  );

  deleteProductType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productTypeActions.deleteProductType),
      switchMap(({ id }) =>
        this.productTypeService.deleteResource(id).pipe(
          map((productType: any) =>
            productTypeActions.deleteProductTypeSuccessful({
              id,
            })
          ),
          tap(_ =>
            this.alert.showToast(
              'Product Type deleted successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError(error => of(productTypeActions.fetchError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productTypeService: ProductTypeService,
    private alert: AppAlertService
  ) {}
}
