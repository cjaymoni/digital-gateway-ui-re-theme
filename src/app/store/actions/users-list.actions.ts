import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ProductType } from 'src/app/models/product-ad.model';
import { User } from 'src/app/models/user-auth.model';

class UsersListActions {
  readonly type = '[UsersList Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ usersLists: User[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{ error: any }>()
  );

  selectUser = createAction(
    `${this.type} Select User`,
    props<{
      user: User;
    }>()
  );

  selectUserToEdit = createAction(
    `${this.type} Select User To Edit`,
    props<{
      user: User;
    }>()
  );

  selectUserSuccess = createAction(`${this.type} Select User Success`);

  searchUser = createAction(
    `${this.type} Search User`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectUser = createAction(
    `${this.type} Find And Select User`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectUserById = createAction(
    `${this.type} Find And Select User By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchUserSuccess = createAction(`${this.type} Search User Success`);

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ usersList: User[] }>()
  );

  addUser = createAction(`${this.type} Add User`, props<{ user: User }>());

  addUserSuccessful = createAction(
    `${this.type} Add User Successful`,
    props<{ user: User }>()
  );

  editUser = createAction(`${this.type} Edit User`, props<{ user: User }>());

  editUserSuccessful = createAction(
    `${this.type} Edit User Successful`,
    props<{ updatedUser: Update<User> }>()
  );

  deleteUser = createAction(
    `${this.type} Delete User`,
    props<{ id: number }>()
  );

  deleteUserSuccessful = createAction(
    `${this.type} Delete User Successful`,
    props<{ id: number }>()
  );

  clearSelected = createAction(`${this.type} Clear All Selected Users`);
}

export const usersListActions = new UsersListActions();
