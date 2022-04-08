import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { AppUploadedImage } from 'src/app/models/article.model';
import { Forum, ForumPost } from 'src/app/models/forum.model';
import { CommentActions } from './comments.action';

class ForumActions {
  readonly type = '[Forum  Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ forums: Forum[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectForum = createAction(
    `${this.type} Select Forum`,
    props<{
      forum: Forum;
    }>()
  );

  selectForumPost = createAction(
    `${this.type} Select Forum Post`,
    props<{
      forumPost: ForumPost;
    }>()
  );

  selectForumToEdit = createAction(
    `${this.type} Select Forum Post To Edit`,
    props<{
      forum: Forum;
    }>()
  );

  selectForumSuccess = createAction(`${this.type} Select Forum Success`);

  searchForum = createAction(
    `${this.type} Search Forum `,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectForum = createAction(
    `${this.type} Find And Select Forum`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectForumById = createAction(
    `${this.type} Find And Select Forum By Id`,
    props<{
      id: string | number;
    }>()
  );

  selectForumPostById = createAction(
    `${this.type} Find Forum Post By Id`,
    props<{
      id: string | number;
    }>()
  );

  selectForumPostByIdSuccess = createAction(
    `${this.type} Select Forum By Id`,
    props<{
      forumPost: ForumPost;
    }>()
  );

  searchForumSuccess = createAction(`${this.type} Search Forum Success`);

  addForum = createAction(`${this.type} Add Forum`, props<{ forum: Forum }>());

  addForumSuccessful = createAction(
    `${this.type} Add Forum Post Successful`,
    props<{ forum: Forum }>()
  );

  editForum = createAction(
    `${this.type} Edit Forum Post`,
    props<{
      forum: Forum;
    }>()
  );

  editForumSuccessful = createAction(
    `${this.type} Edit Forum Successful`,
    props<{ updatedForum: Update<Forum> }>()
  );

  deleteForum = createAction(
    `${this.type} Delete Forum`,
    props<{ id: number }>()
  );

  deleteForumSuccessful = createAction(
    `${this.type} Delete Forum Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected Forum`);

  likePost = createAction(
    `${this.type} Like Forum Post`,
    props<{
      id: number;
    }>()
  );

  likePostSuccessful = createAction(
    `${this.type} Like Forum Post Successful`,
    props<{
      id: number;
    }>()
  );

  dislikePost = createAction(
    `${this.type} Dislike Forum Post`,
    props<{
      id: number;
    }>()
  );

  dislikePostSuccessful = createAction(
    `${this.type} Dislike Forum Post Successful`,
    props<{
      id: number;
    }>()
  );

  fetchNewComments = createAction(
    `${this.type} Fetch and Reload Forum Post Comments`,
    props<{
      id: number;
    }>()
  );

  findAndSelectTodayForum = createAction(
    `${this.type} Fetch Today Forum Posts`
  );

  noop = createAction(`${this.type} No Operation`);

  startLoading = createAction(`${this.type} Start Loading`);

  comments = new CommentActions();
}
export const forumActions = new ForumActions();

