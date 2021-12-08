import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { Comment } from 'src/app/models/comments.model';
import { ForumPost } from 'src/app/models/forum.model';
import { forumEntityAdapter, ForumState } from '../reducers/forum.reducer';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const forumFeatureSelector = createFeatureSelector(FeatureNamesForStore.Forum);

class ForumSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(forumEntityAdapter, forumFeatureSelector);
  }

  filtered = createSelector(this.state, state => state);

  selectedForum = createSelector(this.state, state => state.selectedForum);

  postsOfSelectedForum = createSelector(
    this.selectedForum,
    selected => selected?.posts || []
  );
  selectedForumToEdit = createSelector(
    this.state,
    state => state.selectedForumToEdit
  );

  selectedForumPost = createSelector(
    this.state,
    state => state?.selectedForumPost as ForumPost
  );

  selectedForumPostBySlug = (slug: string) =>
    createSelector(this.postsOfSelectedForum, (posts: ForumPost[]) => {
      // TODO : make code check for slug identical
      return posts.find(fp => slug?.includes(fp.slug || 'NOTFOUND'));
    });

  commentsOfSelectedForum = createSelector(
    this.state,
    (state: ForumState) => state.commentsOfSelectedForumPosts
  );

  selectedCommentById = (id: number) =>
    createSelector(this.commentsOfSelectedForum, (comments: Comment[]) => {
      return comments.find(c => c.id == id);
    });

  selectedComment = createSelector(
    this.state,
    (state: ForumState) => state.selectedComment
  );

  commentsOfSelectedComment = createSelector(
    this.state,
    (state: ForumState) => state.commentsOfSelectedComment
  );
}

export const forumSelectors = new ForumSelectors();
