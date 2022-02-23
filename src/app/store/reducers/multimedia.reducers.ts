import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { MultiMedia } from '../../models/multimedia.model';
import { multimediaActions } from '../actions/multimedia.actions';

export interface MultiMediaState extends EntityState<MultiMedia> {
  // additional entity state properties
  selectedMultiMedia?: MultiMedia | any;
  searchQuery: '';
  loading: boolean;
  selectedMultiMediaToEdit: MultiMedia | any;
}

export const multiMediaEntityAdapter: EntityAdapter<MultiMedia> =
  createEntityAdapter<MultiMedia>({
    sortComparer: false,
  });

export const initialState: MultiMediaState =
  multiMediaEntityAdapter.getInitialState({
    selectedMultiMedia: null,
    searchQuery: '',
    loading: false,
    selectedMultiMediaToEdit: null,
  });

export const multiMediaReducer = createReducer(
  initialState,
  on(multimediaActions.fetch, state => {
    return { ...state, loading: true };
  }),

  on(multimediaActions.fetchSuccessful, (state, { multimedia }) => {
    return multiMediaEntityAdapter.setAll(multimedia, {
      ...state,
      loading: false,
    });
  }),

  on(multimediaActions.fetchError, state => {
    return { ...state, loading: false };
  }),

  on(multimediaActions.selectMultiMedia, (state, { multimedia }) => {
    return {
      ...state,
      selectedMultiMedia: multimedia,
    };
  }),

  on(multimediaActions.selectMultiMediaToEdit, (state, { multimedia }) => {
    return { ...state, selectedMultiMediaToEdit: multimedia };
  }),

  on(multimediaActions.addMultiMediaSuccessful, (state, { multimedia }) => {
    return multiMediaEntityAdapter.addOne(multimedia, state);
  }),
  on(
    multimediaActions.editMultiMediaSuccessful,
    (state, { updatedMultiMedia }) => {
      return multiMediaEntityAdapter.updateOne(updatedMultiMedia, state);
    }
  ),
  on(multimediaActions.deleteMultiMediaSuccessful, (state, { id }) => {
    return multiMediaEntityAdapter.removeOne(id, state);
  }),
  on(multimediaActions.clearAllSelected, state => {
    return {
      ...state,
      selectedMultiMediaToEdit: null,
      selectedMultiMedia: null,
    };
  })
);
