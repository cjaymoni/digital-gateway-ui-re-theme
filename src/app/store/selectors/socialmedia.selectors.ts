import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { socialMediaEntityAdapter } from '../reducers/socialmedia.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { SocialMedia } from 'src/app/models/social-media.model';

const socialMediaFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.SocialMedia
);

class SocialMediaSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(socialMediaEntityAdapter, socialMediaFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedSocialMedia = createSelector(
    this.state,
    state => state.selectedSocialMedia as SocialMedia
  );

  selectedSocialMediaToEdit = createSelector(
    this.state,
    state => state.selectedSocialMediaToEdit
  );
}
export const socialMediaSelectors = new SocialMediaSelectors();
