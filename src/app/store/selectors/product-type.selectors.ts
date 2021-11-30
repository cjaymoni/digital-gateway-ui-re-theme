import { createFeatureSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { productTypeEntityAdapter } from '../reducers/product-types.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const productTypeFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.ProductType
);

class ProductTypeSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(productTypeEntityAdapter, productTypeFeatureSelector);
  }
}

export const productTypeSelectors = new ProductTypeSelectors();
