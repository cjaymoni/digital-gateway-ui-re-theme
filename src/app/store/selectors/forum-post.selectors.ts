import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { forumPostEntityAdapter } from '../reducers/forum-post.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const forumPostFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.ForumPost
);

class ForumPostSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(forumPostEntityAdapter, forumPostFeatureSelector);
  }

  alll = createSelector(this.state, state => state);
  filtered = createSelector(this.state, state => state);
  selectedForumPost = createSelector(
    this.state,
    state => state.selectedForumPost
  );
  selectedForumPostToEdit = createSelector(
    this.state,
    state => state.selectedForumPostToEdit
  );
}

export const forumPostSelectors = new ForumPostSelectors();
