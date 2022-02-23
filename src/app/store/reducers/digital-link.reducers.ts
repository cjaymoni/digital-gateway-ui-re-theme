import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { DigitalLink } from 'src/app/models/digital-link.model';
import { digitalLinkActions } from '../actions/digital-link.actions';

export interface DigitalLinkState extends EntityState<DigitalLink> {
  // additional entity state properties
  selectedDigitalLink?: DigitalLink | any;
  searchQuery: '';
  loading: boolean;
  selectedDigitalLinkToEdit: DigitalLink | any;
}

export const digitalLinkEntityAdapter: EntityAdapter<DigitalLink> =
  createEntityAdapter<DigitalLink>({
    sortComparer: false,
  });

export const initialState: DigitalLinkState =
  digitalLinkEntityAdapter.getInitialState({
    selectedDigitalLink: null,
    searchQuery: '',
    loading: false,
    selectedDigitalLinkToEdit: null,
  });

export const digitalLinkReducer = createReducer(
  initialState,
  on(digitalLinkActions.fetch, state => {
    return { ...state, loading: true };
  }),

  on(digitalLinkActions.fetchSuccessful, (state, { digitalLink }) => {
    return digitalLinkEntityAdapter.setAll(digitalLink, {
      ...state,
      loading: false,
    });
  }),

  on(digitalLinkActions.fetchError, state => {
    return { ...state, loading: false };
  }),

  on(digitalLinkActions.selectDigitalLink, (state, { digitalLink }) => {
    return {
      ...state,
      selectedDigitalLink: digitalLink,
    };
  }),

  on(digitalLinkActions.selectDigitalLinkToEdit, (state, { digitalLink }) => {
    return { ...state, selectedDigitalLinkToEdit: digitalLink };
  }),

  on(digitalLinkActions.addDigitalLinkSuccessful, (state, { digitalLink }) => {
    return digitalLinkEntityAdapter.addOne(digitalLink, state);
  }),
  on(
    digitalLinkActions.editDigitalLinkSuccessful,
    (state, { updatedDigitalLink }) => {
      return digitalLinkEntityAdapter.updateOne(updatedDigitalLink, state);
    }
  ),
  on(digitalLinkActions.deleteDigitalLinkSuccessful, (state, { id }) => {
    return digitalLinkEntityAdapter.removeOne(id, state);
  }),
  on(digitalLinkActions.clearAllSelected, state => {
    return {
      ...state,
      selectedDigitalLinkToEdit: null,
      selectedDigitalLink: null,
    };
  })
);
