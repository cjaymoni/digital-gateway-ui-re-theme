import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { Category } from 'src/app/models/category.model';
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

  getByPostion = (position: string) =>
    createSelector(this.all, (all: any[]) =>
      all.filter(one => one?.position === position)
    );

  allbyPostion = createSelector(this.state, this.selectAll);

  // topMenu = createSelector(this.all, this.allbyPostion());

  topMenu = () =>
    createSelector(this.all, (all: Category[]) => this.allbyPostion('top'));

  leftMenu = () =>
    createSelector(this.all, (all: Category[]) => this.allbyPostion('left'));
}

export const categorySelectors = new CategorySelectors();

