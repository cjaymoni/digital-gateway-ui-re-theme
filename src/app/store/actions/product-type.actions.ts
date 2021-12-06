import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProductType } from 'src/app/models/product-ad.model';

class ProductTypeActions {
  readonly type = '[ProductType Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ productTypes: ProductType[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{ error: any }>()
  );

  addProductType = createAction(
    `${this.type} Add ProductType`,
    props<{ productType: ProductType }>()
  );

  addProductTypeSuccessful = createAction(
    `${this.type} Add ProductType Successful`,
    props<{ productType: ProductType }>()
  );

  editProductType = createAction(
    `${this.type} Edit ProductType`,
    props<{ productType: ProductType }>()
  );

  editProductTypeSuccessful = createAction(
    `${this.type} Edit ProductType Successful`,
    props<{ updatedProductType: Update<ProductType> }>()
  );

  deleteProductType = createAction(
    `${this.type} Delete ProductType`,
    props<{ id: number }>()
  );

  deleteProductTypeSuccessful = createAction(
    `${this.type} Delete ProductType Successful`,
    props<{ id: number }>()
  );

  clearSelected = createAction(`${this.type} Fetch`);
}

export const productTypeActions = new ProductTypeActions();
