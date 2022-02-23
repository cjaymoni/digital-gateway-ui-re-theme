import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { digitalLinkEntityAdapter } from '../reducers/digital-link.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { DigitalLink } from 'src/app/models/digital-link.model';

const digitalLinkFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.DigitalLink
);

class DigitalLinkSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(digitalLinkEntityAdapter, digitalLinkFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedDigitalLink = createSelector(
    this.state,
    state => state.selectedDigitalLink as DigitalLink
  );

  selectedDigitalLinkToEdit = createSelector(
    this.state,
    state => state.selectedDigitalLinkToEdit
  );
}
export const digitalLinkSelectors = new DigitalLinkSelectors();
