import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Roles } from 'src/app/config/app-config';
import { User } from 'src/app/models/user-auth.model';

export const userAuth =
  createFeatureSelector<Readonly<{ user: User | null }>>('user');

class UserAuthSelectors {
  loggedInUser = createSelector(userAuth, state => state['user']);

  userRole = createSelector(userAuth, state => state['user']?.role as Roles);

  isLoggedIn = createSelector(this.loggedInUser, user =>
    Boolean(user && user.role)
  );
}

export const userAuthSelectors = new UserAuthSelectors();
