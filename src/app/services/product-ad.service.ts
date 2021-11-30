import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ProductAdEndpoint } from '../config/routes';
import { ProductAd } from '../models/product-ad.model';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class ProductAdService extends ResourceService {
  PRODUCT_PROPERTY = 'product.';

  constructor(http: HttpClient) {
    super(http, ProductAdEndpoint);
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
    return this.updateResourcePut(dataToStore, productAd.id).pipe(
      map(data => data as ProductAd)
    );
  }
}
