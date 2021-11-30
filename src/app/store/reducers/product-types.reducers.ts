import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductType } from 'src/app/models/product-ad.model';
import { productTypeActions } from '../actions/product-type.actions';

export interface ProductTypeState extends EntityState<ProductType> {}

export const productTypeEntityAdapter: EntityAdapter<ProductType> =
  createEntityAdapter<ProductType>();

export const initialState: ProductTypeState =
  productTypeEntityAdapter.getInitialState();

export const productTypeReducer = createReducer(
  initialState,
  on(productTypeActions.fetchSuccessful, (state, { productTypes }) => {
    return productTypeEntityAdapter.setAll(productTypes, state);
  }),
  on(productTypeActions.addProductTypeSuccessful, (state, { productType }) => {
    return productTypeEntityAdapter.addOne(productType, state);
  }),
  on(
    productTypeActions.editProductTypeSuccessful,
    (state, { updatedProductType }) => {
      return productTypeEntityAdapter.updateOne(updatedProductType, state);
    }
  ),
  on(productTypeActions.deleteProductTypeSuccessful, (state, { id }) => {
    return productTypeEntityAdapter.removeOne(id, state);
  })
);
