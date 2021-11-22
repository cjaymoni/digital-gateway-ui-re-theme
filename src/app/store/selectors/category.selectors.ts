import { categoryEntityAdapter } from '../reducers/category.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

class CategorySelectors extends DefaultAdapterSelectors {
  constructor() {
    super(categoryEntityAdapter);
  }
}

export const categorySelectors = new CategorySelectors();
