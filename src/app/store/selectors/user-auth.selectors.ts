import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/models/user-auth.model';

export const userAuth = createFeatureSelector<Readonly<any>>('user');

class UserAuthSelectors {
  loggedInUser = createSelector(userAuth, state => state['user']);
}

export const userAuthSelectors = new UserAuthSelectors();
