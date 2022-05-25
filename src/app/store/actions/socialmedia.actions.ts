import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { SocialMedia } from 'src/app/models/social-media.model';

class SocialMediaActions {
  readonly type = '[SocialMedia Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ socialmedia: SocialMedia[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectSocialMedia = createAction(
    `${this.type} Select SocialMedia`,
    props<{
      socialmedia: SocialMedia;
    }>()
  );

  selectSocialMediaToEdit = createAction(
    `${this.type} Select SocialMedia To Edit`,
    props<{
      socialmedia: SocialMedia;
    }>()
  );

  selectSocialMediaSuccess = createAction(
    `${this.type} Select SocialMedia Success`
  );

  searchSocialMedia = createAction(
    `${this.type} Search SocialMedia`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectSocialMedia = createAction(
    `${this.type} Find And Select SocialMedia`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectSocialMediaById = createAction(
    `${this.type} Find And Select SocialMedia By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchSocialMediaSuccess = createAction(
    `${this.type} Search SocialMedia Success`
  );

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ socialmedia: SocialMedia[] }>()
  );

  addSocialMedia = createAction(
    `${this.type} Add SocialMedia`,
    props<{ socialmedia: SocialMedia }>()
  );

  addSocialMediaSuccessful = createAction(
    `${this.type} Add SocialMedia Successful`,
    props<{ socialmedia: SocialMedia }>()
  );

  editSocialMedia = createAction(
    `${this.type} Edit SocialMedia`,
    props<{
      socialmedia: SocialMedia;
    }>()
  );

  editSocialMediaSuccessful = createAction(
    `${this.type} Edit SocialMedia Successful`,
    props<{ updatedSocialMedia: Update<SocialMedia> }>()
  );

  deleteSocialMedia = createAction(
    `${this.type} Delete SocialMedia`,
    props<{ id: number }>()
  );

  deleteSocialMediaSuccessful = createAction(
    `${this.type} Delete SocialMedia Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected SocialMedia`);
}
export const socialmediaActions = new SocialMediaActions();
