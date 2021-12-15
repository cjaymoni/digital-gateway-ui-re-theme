import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';

import { userProfileEntityAdapter } from '../reducers/user-profile.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const userProfileFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.UserProfile
);

class UserProfileSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(userProfileEntityAdapter, userProfileFeatureSelector);
  }

  alll = createSelector(this.state, state => state);
  selectedUserProfile = createSelector(
    this.state,
    state => state.selectedUserProfile
  );
  selectedUserProfileToEdit = createSelector(
    this.state,
    state => state.selectedUserProfileToEdit
  );
}

export const userProfileSelectors = new UserProfileSelectors();
