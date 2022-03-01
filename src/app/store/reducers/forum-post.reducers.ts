import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ForumPost } from 'src/app/models/forum.model';
import { forumPostActions } from '../actions/forum-post.action';

export interface ForumPostState extends EntityState<ForumPost> {
  // additional entity state properties
  selectedForumPost: ForumPost | null;
  searchQuery: '';
  loading: boolean;
  selectedForumPostToEdit: ForumPost | null;
}

export const forumPostEntityAdapter: EntityAdapter<ForumPost> =
  createEntityAdapter<ForumPost>({
    sortComparer: false,
  });

export const initialState: ForumPostState =
  forumPostEntityAdapter.getInitialState({
    selectedForumPost: null,
    searchQuery: '',
    loading: false,
    selectedForumPostToEdit: null,
  });

export const forumPostReducer = createReducer(
  initialState,
  on(forumPostActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(forumPostActions.fetchSuccessful, (state, { forumPosts }) => {
    return forumPostEntityAdapter.setAll(forumPosts, {
      ...state,
      loading: false,
    });
  }),
  on(forumPostActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(forumPostActions.findAndSelectForumPost, state => {
    return { ...state, loading: true };
  }),
  on(forumPostActions.findAndSelectForumPostById, state => {
    return { ...state, loading: true };
  }),
  on(forumPostActions.selectForumPost, (state, { forumPost }) => {
    return { ...state, selectedForumPost: forumPost, loading: false };
  }),
  on(forumPostActions.selectForumPostToEdit, (state, { forumPost }) => {
    return { ...state, selectedForumPostToEdit: forumPost, loading: false };
  }),
  on(forumPostActions.addForumPostSuccessful, (state, { forumPost }) => {
    return forumPostEntityAdapter.addOne(forumPost, {
      ...state,
      loading: false,
    });
  }),
  on(
    forumPostActions.editForumPostSuccessful,
    (state, { updatedForumPost }) => {
      return forumPostEntityAdapter.updateOne(updatedForumPost, {
        ...state,
        loading: false,
      });
    }
  ),
  on(forumPostActions.deleteForumPostSuccessful, (state, { id }) => {
    return forumPostEntityAdapter.removeOne(id, state);
  }),
  on(forumPostActions.clearAllSelected, state => {
    return { ...state, selectedForumPostToEdit: null, selectedForumPost: null };
  })
);
