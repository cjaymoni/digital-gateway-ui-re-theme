import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Comment } from 'src/app/models/comments.model';
import { Forum, ForumPost } from 'src/app/models/forum.model';
import { forumActions } from '../actions/forum.actions';

export interface ForumState extends EntityState<Forum> {
  // additional entity state properties
  selectedForum: Forum | null;
  searchQuery: '';
  loading: boolean;
  selectedForumToEdit: Forum | null;
  selectedForumPost: ForumPost | null;
  postsOfSelectedForum: ForumPost[];
  commentsOfSelectedForumPosts: Comment[];
}

export const forumEntityAdapter: EntityAdapter<Forum> =
  createEntityAdapter<Forum>({
    sortComparer: false,
  });

export const initialState: ForumState = forumEntityAdapter.getInitialState({
  selectedForum: null,
  searchQuery: '',
  loading: false,
  selectedForumToEdit: null,
  selectedForumPost: null,
  postsOfSelectedForum: [],
  commentsOfSelectedForumPosts: [],
  commentsOfSelectedComments: [],
});

export const forumReducer = createReducer(
  initialState,
  on(forumActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(forumActions.fetchSuccessful, (state, { forums }) => {
    return forumEntityAdapter.setAll(forums, {
      ...state,
      loading: false,
    });
  }),
  on(forumActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(forumActions.selectForum, (state, { forum }) => {
    return {
      ...state,
      selectedForum: forum,
      postsOfSelectedForum: forum.posts,
    };
  }),
  on(forumActions.selectForumPost, (state, { forumPost }) => {
    return {
      ...state,
      selectedForumPost: forumPost,
      commentsOfSelectedForumPosts: forumPost.comments || [],
    };
  }),
  on(forumActions.selectForumToEdit, (state, { forum }) => {
    return { ...state, selectedForumToEdit: forum };
  }),
  on(forumActions.comments.addCommentSuccessful, (state, { comment }) => {
    const copyOfComments = [...state.commentsOfSelectedForumPosts];
    const newComments = [comment].concat(copyOfComments);
    return { ...state, commentsOfSelectedForumPosts: newComments };
  }),
  on(forumActions.addForumSuccessful, (state, { forum }) => {
    return forumEntityAdapter.addOne(forum, state);
  }),
  on(forumActions.editForumSuccessful, (state, { updatedForum }) => {
    return forumEntityAdapter.updateOne(updatedForum, state);
  }),
  on(forumActions.deleteForumSuccessful, (state, { id }) => {
    return forumEntityAdapter.removeOne(id, state);
  }),
  on(forumActions.clearAllSelected, state => {
    return { ...state, selectedForumToEdit: null, selectedForum: null };
  })
);
