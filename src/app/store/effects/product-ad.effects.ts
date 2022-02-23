import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE, PrimeNgAlerts } from 'src/app/config/app-config';
import { ProductAd } from 'src/app/models/product-ad.model';
import { ProductAdService } from 'src/app/services/product-ad.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { productAdActions } from '../actions/product-ad.actions';

@Injectable()
export class ProductAdEffects {
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.fetch),
      switchMap(() =>
        this.productAdService.getResources().pipe(
          map((productAds: ProductAd[]) =>
            productAdActions.fetchSuccessful({
              productAds,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(productAdActions.fetchError);
          })
        )
      )
    )
  );

  loadMyProductAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.changeSearchPage, productAdActions.fetchMyProductAds),
      switchMap((d: any) =>
        this.productAdService
          .getProductAdToModerate(d.searchPage || 1, DEFAULT_PAGE_SIZE)
          .pipe(
            map((productAd: ProductAd[]) =>
              productAdActions.fetchMyProductAdsSuccessful({
                productAd,
              })
            ),
            catchError(error => {
              this.showError(error);
              return of(productAdActions.fetchError);
            })
          )
      )
    )
  );

  searchProductAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.findAndSelectProductAd),
      switchMap(({ searchParams }) =>
        this.productAdService.searchAd(searchParams).pipe(
          map((productAds: ProductAd[]) =>
            productAdActions.selectProductAd({
              productAd: productAds?.[0],
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(productAdActions.fetchError);
          })
        )
      )
    )
  );

  searchAllProductAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.searchProductAd),
      switchMap(({ searchParams }) =>
        this.productAdService.searchAd(searchParams).pipe(
          map((productAd: ProductAd[]) =>
            productAdActions.fetchSearchSuccessful({
              productAd,
            })
          ),
          catchError(error => {
            this.showError(error);
            return of(productAdActions.fetchError);
          })
        )
      )
    )
  );

  addProductAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.addProductAd),
      switchMap(({ productAd, imagesToUpload }) =>
        this.productAdService.createAd(productAd, imagesToUpload).pipe(
          map((savedProductAd: any) =>
            productAdActions.addProductAdSuccessful({
              productAd: savedProductAd,
            })
          ),
          tap(saved => this.showToast('Product Ad Saved Successfully')),
          catchError(error => {
            this.showError(error);
            return of(productAdActions.fetchError);
          })
        )
      )
    )
  );

  editProductAds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAdActions.editProductAd),
      switchMap(({ productAd, imagesToUpload }) =>
        this.productAdService.updateAd(productAd, imagesToUpload).pipe(
          map((updatedProductAd: any) =>
            productAdActions.editProductAdSuccessful({
              updatedProductAd: {
                changes: updatedProductAd,
                id: updatedProductAd.id,
              },
            })
          ),
          tap(saved => this.showToast('Product Ad Edited Successfully')),
          catchError(error => {
            this.showError(error);
            return of(productAdActions.fetchError);
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
    private productAdService: ProductAdService,
    private alert: AppAlertService
  ) {}
}
