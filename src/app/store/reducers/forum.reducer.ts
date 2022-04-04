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

  on(forumActions.findAndSelectForum, state => {
    return {
      ...state,
      loading: true,
      postsOfSelectedForum: [],
      selectedForum: null,
    };
  }),
  on(forumActions.findAndSelectForumById, state => {
    return {
      ...state,
      loading: true,
      postsOfSelectedForum: [],
      selectedForum: null,
    };
  }),
  on(forumActions.findAndSelectTodayForum, state => {
    return {
      ...state,
      loading: true,
      postsOfSelectedForum: [],
      selectedForum: null,
    };
  }),

  on(forumActions.selectForum, (state, { forum }) => {
    return {
      ...state,
      selectedForum: forum,
      postsOfSelectedForum: forum?.posts,
      loading: false,
    };
  }),

  on(forumActions.selectForumPost, (state, { forumPost }) => {
    return {
      ...state,
      selectedForumPost: forumPost,
      commentsOfSelectedForumPosts: forumPost.comments || [],
      loading: false,
    };
  }),

  on(forumActions.selectForumToEdit, (state, { forum }) => {
    return { ...state, selectedForumToEdit: forum, loading: false };
  }),

  on(forumActions.comments.addCommentSuccessful, (state, { comment }) => {
    // situation 1 : comment added to another selected comment
    // i.e side panel opened ( side panel will handle showing list)
    if (comment.parent && comment.parent === state.selectedComment?.id) {
      return state;
    }

    //situation 2: comment is a comment of another post but not the selected post
    // find and update comments of selected forumpost (only update as subcomment)
    if (comment.parent) {
      const copyOfComments = [...state.commentsOfSelectedForumPosts];
      const updatedCopy = copyOfComments.map(comm => {
        const _comment = { ...comm };
        if (_comment.id === comment.parent) {
          _comment.subcomments = [comment].concat(_comment.subcomments || []);
        }
        return _comment;
      });
      return { ...state, commentsOfSelectedForumPosts: updatedCopy };
    }

    // find forumPost and add comment to commentsOfSelectedPost

    const _copySelectedForumPost = { ...state.selectedForumPost };
    if (comment.post === state.selectedForumPost?.id) {
      _copySelectedForumPost.comments = [comment].concat(
        _copySelectedForumPost.comments
      );
    }

    const copyOfComments = [...state.commentsOfSelectedForumPosts];
    const newComments = [comment].concat(copyOfComments);
    return {
      ...state,
      commentsOfSelectedForumPosts: newComments,
      selectedForumPost: _copySelectedForumPost,
    };
  }),
  on(forumActions.comments.selectComment, (state, { comment }) => {
    return {
      ...state,
      selectedComment: comment,
      loading: false,
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
    return {
      ...state,
      selectedForumToEdit: null,
      selectedForum: null,
      selectedForumPost: null,
      postsOfSelectedForum: [],
      loading: false,
    };
  })
);

