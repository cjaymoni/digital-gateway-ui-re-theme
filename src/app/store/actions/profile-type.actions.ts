import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProfileType } from '../../models/user-auth.model';

class ProfileTypeActions {
  readonly type = '[ProfileType Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ profileTypes: ProfileType[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{ error: any }>()
  );

  addProfileType = createAction(
    `${this.type} Add ProfileType`,
    props<{ profileType: ProfileType }>()
  );

  addProfileTypeSuccessful = createAction(
    `${this.type} Add ProfileType Successful`,
    props<{ profileType: ProfileType }>()
  );

  editProfileType = createAction(
    `${this.type} Edit ProfileType`,
    props<{ profileType: ProfileType }>()
  );

  editProfileTypeSuccessful = createAction(
    `${this.type} Edit ProfileType Successful`,
    props<{ updatedProfileType: Update<ProfileType> }>()
  );

  deleteProfileType = createAction(
    `${this.type} Delete ProfileType`,
    props<{ id: number }>()
  );

  deleteProfileTypeSuccessful = createAction(
    `${this.type} Delete ProfileType Successful`,
    props<{ id: number }>()
  );

  clearSelected = createAction(`${this.type} Fetch`);
}

export const profileTypeActions = new ProfileTypeActions();
