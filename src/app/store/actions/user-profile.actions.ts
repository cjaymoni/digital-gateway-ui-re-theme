import { createAction, props } from '@ngrx/store';

import { UserProfile } from '../../models/user-auth.model';

class UserProfileActions {
  readonly type = '[User Profile Actions]';
  findAndSelectUserProfileById = createAction(
    `${this.type} Find And Select User Profile By Id`,
    props<{
      id: string | number;
    }>()
  );

  selectUserProfile = createAction(
    `${this.type} Select User Profile`,
    props<{
      userProfile: UserProfile;
    }>()
  );

  selectUserProfileToEdit = createAction(
    `${this.type} Select USer Profile To Edit`,
    props<{
      userProfile: UserProfile;
    }>()
  );
  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ userProfiles: UserProfile[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  clearAllSelected = createAction(`${this.type} Clear Selected UserProfile`);
}

export const userProfileActions = new UserProfileActions();
