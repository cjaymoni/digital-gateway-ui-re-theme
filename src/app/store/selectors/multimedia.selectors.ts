import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { multiMediaEntityAdapter } from '../reducers/multimedia.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { MultiMedia } from 'src/app/models/multimedia.model';

const multiMediaFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.MultiMedia
);

class MultiMediaSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(multiMediaEntityAdapter, multiMediaFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedMultiMedia = createSelector(
    this.state,
    state => state.selectedMultiMedia as MultiMedia
  );

  selectedMultiMediaToEdit = createSelector(
    this.state,
    state => state.selectedMultiMediaToEdit
  );
}
export const multiMediaSelectors = new MultiMediaSelectors();
