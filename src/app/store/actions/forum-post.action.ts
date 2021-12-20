import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { AppUploadedImage } from 'src/app/models/article.model';
import { Forum, ForumPost } from 'src/app/models/forum.model';

class ForumPostActions {
  readonly type = '[Forum Post Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ forumPosts: ForumPost[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectForumPost = createAction(
    `${this.type} Select Forum Post`,
    props<{
      forumPost: ForumPost;
    }>()
  );

  selectForumPostToEdit = createAction(
    `${this.type} Select Forum Post To Edit`,
    props<{
      forumPost: ForumPost;
    }>()
  );

  selectForumPostSuccess = createAction(
    `${this.type} Select Forum Post Success`
  );

  searchForumPost = createAction(
    `${this.type} Search Forum Post`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectForumPost = createAction(
    `${this.type} Find And Select Forum Post`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectForumPostById = createAction(
    `${this.type} Find And Select Forum Post By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchForumPostSuccess = createAction(
    `${this.type} Search Forum Post Success`
  );

  addForumPost = createAction(
    `${this.type} Add ForumPost`,
    props<{ forumPost: ForumPost; imageToUpload: File[] | any[] }>()
  );

  addForumPostSuccessful = createAction(
    `${this.type} Add Forum Post Successful`,
    props<{ forumPost: ForumPost }>()
  );

  editForumPost = createAction(
    `${this.type} Edit Forum Post`,
    props<{
      forumPost: ForumPost;
      imageToUpload: File[] | any[];
    }>()
  );

  editForumPostSuccessful = createAction(
    `${this.type} Edit Forum Post Successful`,
    props<{ updatedForumPost: Update<ForumPost> }>()
  );

  deleteForumPost = createAction(
    `${this.type} Delete Forum Post`,
    props<{ id: number }>()
  );

  deleteForumPostSuccessful = createAction(
    `${this.type} Delete Forum Post Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(
    `${this.type} Clear All Selected Forum Posts`
  );
}
export const forumPostActions = new ForumPostActions();
