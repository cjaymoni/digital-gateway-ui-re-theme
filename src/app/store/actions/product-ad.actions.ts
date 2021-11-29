import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { AppUploadedImage } from 'src/app/models/article.model';
import { ProductAd } from 'src/app/models/product-ad.model';

class ProductAdActions {
  readonly type = '[Product Ad Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ productAds: ProductAd[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectProductAd = createAction(
    `${this.type} Select Product Ad`,
    props<{
      productAd: ProductAd;
    }>()
  );

  selectProductAdToEdit = createAction(
    `${this.type} Select Product Ad To Edit`,
    props<{
      productAd: ProductAd;
    }>()
  );

  selectProductAdSuccess = createAction(
    `${this.type} Select Product Ad Success`
  );

  searchProductAd = createAction(
    `${this.type} Search Product Ad`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectProductAd = createAction(
    `${this.type} Find And Select Product Ad`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  searchProductAdSuccess = createAction(
    `${this.type} Search Product Ad Success`
  );

  addProductAd = createAction(
    `${this.type} Add Product Ad`,
    props<{ productAd: ProductAd; imagesToUpload?: File[] }>()
  );

  addProductAdSuccessful = createAction(
    `${this.type} Add Product Ad Successful`,
    props<{ productAd: ProductAd }>()
  );

  editProductAd = createAction(
    `${this.type} Edit Product Ad`,
    props<{
      productAd: ProductAd;
      imagesToUpload: File[] | AppUploadedImage[] | any;
    }>()
  );

  editProductAdSuccessful = createAction(
    `${this.type} Edit Product Ad Successful`,
    props<{ updatedProductAd: Update<ProductAd> }>()
  );

  deleteProductAd = createAction(
    `${this.type} Delete Product Ad`,
    props<{ id: number }>()
  );

  deleteProductAdSuccessful = createAction(
    `${this.type} Delete Product Ad Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected ProductAds`);
}
export const productAdActions = new ProductAdActions();
