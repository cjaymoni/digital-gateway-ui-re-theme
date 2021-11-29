import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { productAdEntityAdapter } from '../reducers/product-ad.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const productAdFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.ProductAd
);

class ProductAdSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(productAdEntityAdapter, productAdFeatureSelector);
  }

  alll = createSelector(this.state, state => state);
  filtered = createSelector(this.state, state => state);
  selectedProductAd = createSelector(
    this.state,
    state => state.selectedProductAd
  );
  selectedProductToEdit = createSelector(
    this.state,
    state => state.selectedProductToEdit
  );
}

export const productAdSelectors = new ProductAdSelectors();
