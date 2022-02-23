import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DEFAULT_PAGE_SIZE } from 'src/app/config/app-config';
import { ProductAdEndpoint } from '../config/routes';
import { ProductAd } from '../models/product-ad.model';
import { ResourceService } from './resources.service';
import { productAdActions } from './../store/actions/product-ad.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductAdService extends ResourceService {
  PRODUCT_PROPERTY = 'product.';

  constructor(http: HttpClient, private store: Store) {
    super(http, ProductAdEndpoint);
  }

  searchAd(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as ProductAd[])
    );
  }

  createAd(productAd: ProductAd, imagesToUpload?: File[]) {
    const dataToStore = this.getFormDataFromObject(
      productAd,
      imagesToUpload,
      this.PRODUCT_PROPERTY
    );
    return this.storeResource(dataToStore).pipe(map(data => data as ProductAd));
  }

  updateAd(productAd: ProductAd, imagesToUpload?: File[]) {
    const dataToStore = this.getFormDataFromObject(
      productAd,
      imagesToUpload,
      this.PRODUCT_PROPERTY
    );
    return this.updateResourcePut(dataToStore, productAd.product.id).pipe(
      map(data => data as ProductAd)
    );
  }

  getProductAdToModerate(page = 1, page_size = DEFAULT_PAGE_SIZE) {
    return this.getResources(
      `${this.endpoint}?moderate=True`,
      {
        page,
        page_size,
      },
      undefined,
      true
    ).pipe(
      tap((data: any) =>
        this.store.dispatch(
          productAdActions.setSearchCount({
            count: data.count,
          })
        )
      ),
      map(data => data.results as ProductAd[])
    );
  }
}
