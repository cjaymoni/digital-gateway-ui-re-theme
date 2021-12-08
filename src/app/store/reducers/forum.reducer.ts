import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Comment } from 'src/app/models/comments.model';
import { Forum, ForumPost } from 'src/app/models/forum.model';
import { forumActions } from '../actions/forum.actions';

export interface ForumState extends EntityState<Forum> {
  // additional entity state properties
  selectedForum?: Forum | any;
  searchQuery: '';
  loading: boolean;
  selectedForumToEdit: Forum | any;
  selectedForumPost: ForumPost | any;
  postsOfSelectedForum: ForumPost[];
  commentsOfSelectedForumPosts: Comment[];
  selectedComment: Comment | any;
  commentsOfSelectedComment: Comment[];
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
  commentsOfSelectedComment: [],
  selectedComment: null,
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
  on(forumActions.likePostSuccessful, (state, { id }) => {
    const copyOfSelectedPost: ForumPost = { ...state.selectedForumPost };
    if (!!copyOfSelectedPost) {
      copyOfSelectedPost.upvotes++;
    }
    return { ...state, selectedForumPost: copyOfSelectedPost };
  }),
  on(forumActions.dislikePostSuccessful, (state, { id }) => {
    const copyOfSelectedPost: ForumPost = { ...state.selectedForumPost };
    if (!!copyOfSelectedPost) {
      copyOfSelectedPost.downvotes++;
    }
    return { ...state, selectedForumPost: copyOfSelectedPost };
  }),
  on(forumActions.comments.likeCommentSuccessful, (state, { id }) => {
    const copyOfCommentsOfSelectedPost: Comment[] = [
      ...state.commentsOfSelectedForumPosts,
    ];
    const newComments = copyOfCommentsOfSelectedPost.map(comment => {
      const copy = { ...comment };
      if (comment.id === id) {
        copy.upvotes++;
      }
      return copy;
    });
    return { ...state, commentsOfSelectedForumPosts: newComments };
  }),
  on(forumActions.comments.dislikeCommentSuccessful, (state, { id }) => {
    const copyOfCommentsOfSelectedPost: Comment[] = [
      ...state.commentsOfSelectedForumPosts,
    ];

    const newComments = copyOfCommentsOfSelectedPost.map(comment => {
      const copy = { ...comment };
      if (comment.id === id) {
        copy.downvotes++;
      }
      return copy;
    });
    return { ...state, commentsOfSelectedForumPosts: newComments };
  }),
  on(forumActions.comments.selectComment, (state, { comment }) => {
    return {
      ...state,
      selectedComment: comment,
      commentsOfSelectedComment: comment.subcomments || [],
    };
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
