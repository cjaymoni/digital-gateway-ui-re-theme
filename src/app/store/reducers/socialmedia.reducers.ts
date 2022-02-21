import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SocialMedia } from 'src/app/models/social-media.model';
import { socialmediaActions } from '../actions/socialmedia.actions';

export interface SocialMediaState extends EntityState<SocialMedia> {
  // additional entity state properties
  selectedSocialMedia?: SocialMedia | any;
  searchQuery: '';
  loading: boolean;
  selectedSocialMediaToEdit: SocialMedia | any;
}

export const socialMediaEntityAdapter: EntityAdapter<SocialMedia> =
  createEntityAdapter<SocialMedia>({
    sortComparer: false,
  });

export const initialState: SocialMediaState =
socialMediaEntityAdapter.getInitialState({
  selectedSocialMedia: null,
    searchQuery: '',
    loading: false,
    selectedSocialMediaToEdit: null,
});

export const socialMediaReducer = createReducer(
  initialState,
  on(socialmediaActions.fetch, state => {
    return { ...state, loading: true };
  }),

  on(socialmediaActions.fetchSuccessful, (state, { socialmedia }) => {
    return socialMediaEntityAdapter.setAll(socialmedia, {
      ...state,
      loading: false,
    });
  }),

  on(socialmediaActions.fetchError, state => {
    return { ...state, loading: false };
  }),

  on(socialmediaActions.selectSocialMedia, (state, { socialmedia }) => {
    return {
      ...state,
      selectedSocialMedia: socialmedia,
    };
  }),

  on(socialmediaActions.selectSocialMediaToEdit, (state, { socialmedia }) => {
    return { ...state, selectedSocialMediaToEdit: socialmedia };
  }),

  on(socialmediaActions.addSocialMediaSuccessful, (state, { socialmedia }) => {
    return socialMediaEntityAdapter.addOne(socialmedia, state);
  }),
  on(
    socialmediaActions.editSocialMediaSuccessful,
    (state, { updatedSocialMedia }) => {
      return socialMediaEntityAdapter.updateOne(updatedSocialMedia, state);
    }
  ),
  on(socialmediaActions.deleteSocialMediaSuccessful, (state, { id }) => {
    return socialMediaEntityAdapter.removeOne(id, state);
  }),
  on(socialmediaActions.clearAllSelected, state => {
    return {
      ...state,
      selectedSocialMediaToEdit: null,
      selectedSocialMedia: null,
    };
  })
);
