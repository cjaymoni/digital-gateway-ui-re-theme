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
  searchResults: ProductAd[];
  myMarketAds: ProductAd[];
  searchPage: number;
  searchCount: number;
  page: number;
  count: number;
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
    searchResults: [],
    myMarketAds: [],
    searchPage: 1,
    searchCount: 0,
    page: 1,
    count: 0,
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
  on(productAdActions.fetchSearchSuccessful, (state, { productAd }) => {
    return { ...state, loading: false, searchResults: productAd };
  }),
  on(productAdActions.fetchMyProductAdsSuccessful, (state, { productAd }) => {
    return { ...state, loading: false, myMarketAds: productAd };
  }),
  on(productAdActions.searchProductAd, state => {
    return { ...state, loading: true };
  }),
  on(productAdActions.findAndSelectProductAd, state => {
    return { ...state, loading: true };
  }),
  on(productAdActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(productAdActions.selectProductAd, (state, { productAd }) => {
    return { ...state, selectedProductAd: productAd, loading: false };
  }),
  on(productAdActions.selectProductAdToEdit, (state, { productAd }) => {
    return { ...state, selectedProductAdToEdit: productAd, loading: false };
  }),
  on(productAdActions.addProductAdSuccessful, (state, { productAd }) => {
    const myMarketAdsCopy = [...state.myMarketAds];
    myMarketAdsCopy.push(productAd);
    return productAdEntityAdapter.addOne(productAd, {
      ...state,
      loading: false,
      myMarketAds: [...myMarketAdsCopy],
    });
  }),
  on(
    productAdActions.editProductAdSuccessful,
    (state, { updatedProductAd }) => {
      const myMarketAdsCopy = [...state.myMarketAds];
      const index = myMarketAdsCopy.findIndex(
        pa => pa.id === updatedProductAd.id
      );
      const product = {
        ...myMarketAdsCopy[index],
        ...updatedProductAd.changes,
      };
      myMarketAdsCopy.splice(index, 1, product);

      myMarketAdsCopy.splice(index, 1, product as ProductAd);
      return productAdEntityAdapter.updateOne(updatedProductAd, {
        ...state,
        loading: false,
        myMarketAds: [...myMarketAdsCopy],
      });
    }
  ),
  on(productAdActions.deleteProductAdSuccessful, (state, { id }) => {
    const myMarketAdsCopy = [...state.myMarketAds];
    const index = myMarketAdsCopy.findIndex(pa => pa.id === id);
    myMarketAdsCopy.splice(index, 1);
    return productAdEntityAdapter.removeOne(id, {
      ...state,
      myMarketAds: [...myMarketAdsCopy],
    });
  }),
  on(productAdActions.changePage, (state, { page }) => {
    return { ...state, page, loading: false };
  }),
  on(productAdActions.changeSearchPage, (state, { searchPage }) => {
    return { ...state, searchPage, loading: false };
  }),
  on(productAdActions.setCount, (state, { count }) => {
    return { ...state, count, loading: false };
  }),
  on(productAdActions.setSearchCount, (state, { count }) => {
    return { ...state, searchCount: count, loading: false };
  }),
  on(productAdActions.clearAllSelected, state => {
    return { ...state, selectedProductAdToEdit: null, selectedProductAd: null };
  }),
  on(productAdActions.addProductAd, state => {
    return { ...state, loading: true };
  }),
  on(productAdActions.editProductAd, state => {
    return { ...state, loading: true };
  })
);
