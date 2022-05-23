import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { partnersEntityAdapter } from '../reducers/partners.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { IPartners } from 'src/app/models/partners.model';

const dpartnersFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.Partners
);

class PartnersSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(partnersEntityAdapter, dpartnersFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedPartner = createSelector(
    this.state,
    state => state.selectedPartner as IPartners
  );

  selectedPartnerToEdit = createSelector(
    this.state,
    state => state.selectedPartnerToEdit
  );
}
export const partnersSelectors = new PartnersSelectors();
