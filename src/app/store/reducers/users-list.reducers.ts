import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user-auth.model';
import { usersListActions } from '../actions/users-list.actions';

export interface UsersListState extends EntityState<User> {
  // additional entity state properties
  selectedUser: User | null;
  searchQuery: '';
  loading: boolean;
  selectedUserToEdit: User | null;
  searchResults: User[];
}

export const usersEntityAdapter: EntityAdapter<User> =
  createEntityAdapter<User>({
    sortComparer: false,
  });

export const initialState: UsersListState = usersEntityAdapter.getInitialState({
  selectedUser: null,
  searchQuery: '',
  loading: false,
  selectedUserToEdit: null,
  searchResults: [],
});

export const userListReducer = createReducer(
  initialState,
  on(usersListActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(usersListActions.fetchSuccessful, (state, { usersLists }) => {
    return usersEntityAdapter.setAll(usersLists, { ...state, loading: false });
  }),
  on(usersListActions.fetchSearchSuccessful, (state, { usersList }) => {
    return { ...state, loading: false, searchResults: usersList };
  }),

  on(usersListActions.searchUser, state => {
    return { ...state, loading: true };
  }),
  on(usersListActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(usersListActions.selectUser, (state, { user }) => {
    return { ...state, selectedUser: user };
  }),
  on(usersListActions.selectUserToEdit, (state, { user }) => {
    return { ...state, selectedUserToEdit: user };
  }),
  on(usersListActions.addUserSuccessful, (state, { user }) => {
    return usersEntityAdapter.addOne(user, state);
  }),
  on(usersListActions.editUserSuccessful, (state, { updatedUser }) => {
    return usersEntityAdapter.updateOne(updatedUser, state);
  }),
  on(usersListActions.deleteUserSuccessful, (state, { id }) => {
    return usersEntityAdapter.removeOne(id, state);
  }),
  on(usersListActions.clearSelected, state => {
    return { ...state, selectedUserToEdit: null, selectedUser: null };
  })
);
