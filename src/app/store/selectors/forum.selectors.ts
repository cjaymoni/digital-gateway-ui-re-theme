import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { forumEntityAdapter } from '../reducers/forum.reducer';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const forumFeatureSelector = createFeatureSelector(FeatureNamesForStore.Forum);

class ForumSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(forumEntityAdapter, forumFeatureSelector);
  }
  alll = createSelector(this.state, state => state);
  filtered = createSelector(this.state, state => state);
  selectedForum = createSelector(this.state, state => state.selectedForum);
  selectedForumPost = createSelector(
    this.selectedForum,
    selected => selected.posts
  );
  selectedForumToEdit = createSelector(
    this.state,
    state => state.selectedForumToEdit
  );
}

export const forumSelectors = new ForumSelectors();
