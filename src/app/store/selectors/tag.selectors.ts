import { createFeatureSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { tagEntityAdapter } from '../reducers/tag.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const tagFeatureSelector = createFeatureSelector(FeatureNamesForStore.Tag);

class TagSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(tagEntityAdapter, tagFeatureSelector);
  }
}

export const tagSelectors = new TagSelectors();
