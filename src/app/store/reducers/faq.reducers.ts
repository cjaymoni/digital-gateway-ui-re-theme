import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FAQ } from 'src/app/models/faqs.model';
import { faqActions } from '../actions/faq.actions';

export interface FaqState extends EntityState<FAQ> {
  // additional entity state properties
  selectedFaq?: FAQ | any;
  searchQuery: '';
  loading: boolean;
  selectedFaqToEdit: FAQ | any;
}

export const faqEntityAdapter: EntityAdapter<FAQ> = createEntityAdapter<FAQ>({
  sortComparer: false,
});

export const initialState: FaqState = faqEntityAdapter.getInitialState({
  selectedFaq: null,
  searchQuery: '',
  loading: false,
  selectedFaqToEdit: null,
});

export const faqReducer = createReducer(
  initialState,
  on(faqActions.fetch, state => {
    return { ...state, loading: true };
  }),

  on(faqActions.fetchSuccessful, (state, { faq }) => {
    return faqEntityAdapter.setAll(faq, {
      ...state,
      loading: false,
    });
  }),

  on(faqActions.fetchError, state => {
    return { ...state, loading: false };
  }),

  on(faqActions.selectFaq, (state, { faq }) => {
    return {
      ...state,
      selectedFaq: faq,
    };
  }),

  on(faqActions.selectFaqToEdit, (state, { faq }) => {
    return { ...state, selectedFaqToEdit: faq };
  }),

  on(faqActions.addFaqSuccessful, (state, { faq }) => {
    return faqEntityAdapter.addOne(faq, state);
  }),
  on(faqActions.editFaqSuccessful, (state, { updatedFaq }) => {
    return faqEntityAdapter.updateOne(updatedFaq, state);
  }),
  on(faqActions.deleteFaqSuccessful, (state, { id }) => {
    return faqEntityAdapter.removeOne(id, state);
  }),
  on(faqActions.clearAllSelected, state => {
    return {
      ...state,
      selectedFaqToEdit: null,
      selectedFaq: null,
    };
  })
);

