import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductAd } from 'src/app/models/product-ad.model';
import { productAdActions } from '../actions/product-ad.actions';

export interface ProductAdState extends EntityState<ProductAd> {
  // additional entity state properties
  selectedProductAd: ProductAd | null;
  searchQuery: '';
  loading: boolean;
  selectedProductAdToEdit: ProductAd | null;
}
export function selectId(productAd: ProductAd): string {
  //In this case this would be optional since primary key is id
  return productAd.product.id?.toString() || '';
}

export const productAdEntityAdapter: EntityAdapter<ProductAd> =
  createEntityAdapter<ProductAd>({
    sortComparer: false,
    selectId,
  });

export const initialState: ProductAdState =
  productAdEntityAdapter.getInitialState({
    selectedProductAd: null,
    searchQuery: '',
    loading: false,
    selectedProductAdToEdit: null,
  });

export const productAdReducer = createReducer(
  initialState,
  on(productAdActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(productAdActions.fetchSuccessful, (state, { productAds }) => {
    return productAdEntityAdapter.setAll(productAds, {
      ...state,
      loading: false,
    });
  }),
  on(productAdActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(productAdActions.selectProductAd, (state, { productAd }) => {
    return { ...state, selectedProductAd: productAd };
  }),
  on(productAdActions.selectProductAdToEdit, (state, { productAd }) => {
    return { ...state, selectedProductAdToEdit: productAd };
  }),
  on(productAdActions.addProductAdSuccessful, (state, { productAd }) => {
    return productAdEntityAdapter.addOne(productAd, state);
  }),
  on(
    productAdActions.editProductAdSuccessful,
    (state, { updatedProductAd }) => {
      return productAdEntityAdapter.updateOne(updatedProductAd, state);
    }
  ),
  on(productAdActions.deleteProductAdSuccessful, (state, { id }) => {
    return productAdEntityAdapter.removeOne(id, state);
  }),
  on(productAdActions.clearAllSelected, state => {
    return { ...state, selectedProductAdToEdit: null, selectedProductAd: null };
  })
);
