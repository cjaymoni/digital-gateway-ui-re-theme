import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user-auth.model';

class UserAuth {
  readonly type = '[User Auth Actions]';

  login = createAction(
    `${this.type} Login`,
    props<{
      email: string;
      password: string;
    }>()
  );

  loginSuccessful = createAction(
    `${this.type} Login Successful`,
    props<{ user: User }>()
  );

  logout = createAction(
    `${this.type} Logout`,
    props<{
      email: string;
      password: string;
    }>()
  );

  logoutSuccessful = createAction(`${this.type} Logout Successful`);

  requestPasswordReset = createAction(
    `${this.type} Password Reset Request`,
    props<{
      email?: string;
    }>()
  );

  updateUser = createAction(`${this.type} Update User`);

  userUpdated = createAction(
    `${this.type} User Updated Successfully`,
    props<{
      user: User;
    }>()
  );
}

export const userAuthActions = new UserAuth();

