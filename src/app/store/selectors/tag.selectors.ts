import { tagEntityAdapter } from '../reducers/tag.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

class TagSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(tagEntityAdapter);
  }
}

export const tagSelectors = new TagSelectors();
