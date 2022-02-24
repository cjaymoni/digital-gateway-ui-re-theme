import { createFeatureSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { categoryEntityAdapter } from '../reducers/category.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const categoryFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.Category
);
class CategorySelectors extends DefaultAdapterSelectors {
  constructor() {
    super(categoryEntityAdapter, categoryFeatureSelector);
  }

  selectedCategory = this.state;
}

export const categorySelectors = new CategorySelectors();
