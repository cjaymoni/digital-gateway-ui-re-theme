import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IPartners } from 'src/app/models/partners.model';
import { partnersActions } from '../actions/partners.actions';

export interface PartnersState extends EntityState<IPartners> {
  // additional entity state properties
  selectedPartner?: IPartners | any;
  searchQuery: '';
  loading: boolean;
  selectedPartnerToEdit: IPartners | any;
}

export const partnersEntityAdapter: EntityAdapter<IPartners> =
  createEntityAdapter<IPartners>({
    sortComparer: false,
  });

export const initialState: PartnersState =
  partnersEntityAdapter.getInitialState({
    selectedPartner: null,
    searchQuery: '',
    loading: false,
    selectedPartnerToEdit: null,
  });

export const partnersReducer = createReducer(
  initialState,
  on(partnersActions.fetch, state => {
    return { ...state, loading: true };
  }),

  on(partnersActions.fetchSuccessful, (state, { partners }) => {
    return partnersEntityAdapter.setAll(partners, {
      ...state,
      loading: false,
    });
  }),

  on(partnersActions.fetchError, state => {
    return { ...state, loading: false };
  }),

  on(partnersActions.selectPartner, (state, { partners }) => {
    return {
      ...state,
      selectedPartner: partners,
    };
  }),

  on(partnersActions.selectPartnerToEdit, (state, { partners }) => {
    return { ...state, selectedPartnerToEdit: partners };
  }),

  on(partnersActions.addPartnerSuccessful, (state, { partners }) => {
    return partnersEntityAdapter.addOne(partners, state);
  }),
  on(
    partnersActions.editPartnerSuccessful,
    (state, { updatedPartner }) => {
      return partnersEntityAdapter.updateOne(updatedPartner, state);
    }
  ),
  on(partnersActions.deletePartnerSuccessful, (state, { id }) => {
    return partnersEntityAdapter.removeOne(id, state);
  }),
  on(partnersActions.clearAllSelected, state => {
    return {
      ...state,
      selectedPartnerToEdit: null,
      selectedPartner: null,
    };
  })
);
