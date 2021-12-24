import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { ProductAd } from 'src/app/models/product-ad.model';
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
    state => state.selectedProductToEdit as ProductAd
  );
}

export const productAdSelectors = new ProductAdSelectors();
