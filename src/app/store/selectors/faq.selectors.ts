import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { FAQ } from 'src/app/models/faqs.model';
import { faqEntityAdapter } from '../reducers/faq.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const faqFeatureSelector = createFeatureSelector(FeatureNamesForStore.Faqs);

class FaqSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(faqEntityAdapter, faqFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedFaq = createSelector(this.state, state => state.selectedFaq as FAQ);

  selectedFaqToEdit = createSelector(
    this.state,
    state => state.selectedFaqToEdit
  );
}
export const faqSelectors = new FaqSelectors();

