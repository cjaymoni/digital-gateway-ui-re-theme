import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';

import { DefaultAdapterSelectors } from './default.adapter.selectors';
import {
  usersEntityAdapter,
  UsersListState,
} from '../reducers/users-list.reducers';

const usersListFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.UsersList
);

class UsersListSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(usersEntityAdapter, usersListFeatureSelector);
  }

  alll = createSelector(this.state, state => state);
  filtered = createSelector(this.state, state => state);
  selectedUser = createSelector(this.state, state => state.selectedUser);
  selectedUserToEdit = createSelector(
    this.state,
    state => state.selectedUserToEdit
  );

  searchResults = createSelector(
    this.state,
    (state: UsersListState) => state.searchResults
  );
}

export const usersListSelectors = new UsersListSelectors();
