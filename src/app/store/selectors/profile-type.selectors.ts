import { createFeatureSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { profileTypeEntityAdapter } from '../reducers/profile-types.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const profileTypeFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.ProfileType
);

class ProfileTypeSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(profileTypeEntityAdapter, profileTypeFeatureSelector);
  }
}

export const profileTypeSelectors = new ProfileTypeSelectors();
