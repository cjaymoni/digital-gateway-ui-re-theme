import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserProfile } from '../../models/user-auth.model';
import { userProfileActions } from '../actions/user-profile.actions';

export interface UserProfileState extends EntityState<UserProfile> {
  selectedUserProfile: UserProfile | null;
  selectedUserProfileToEdit: UserProfile | null;
  loading: boolean;
}

export const userProfileEntityAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    sortComparer: false,
  });

export const initialState: UserProfileState =
  userProfileEntityAdapter.getInitialState({
    selectedUserProfile: null,
    selectedUserProfileToEdit: null,
    loading: false,
  });

export const userProfileReducer = createReducer(
  initialState,
  on(userProfileActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(userProfileActions.selectUserProfile, (state, { userProfile }) => {
    return { ...state, selectedUserProfile: userProfile };
  }),
  on(userProfileActions.selectUserProfileToEdit, (state, { userProfile }) => {
    return { ...state, selectedUserProfileToEdit: userProfile };
  }),
  on(userProfileActions.clearAllSelected, state => {
    return {
      ...state,
      selectedUserProfileToEdit: null,
      selectedUserProfile: null,
    };
  })
);
