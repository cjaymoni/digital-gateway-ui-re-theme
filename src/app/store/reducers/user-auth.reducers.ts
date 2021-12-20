import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user-auth.model';
import { userAuthActions } from '../actions/user-auth.actions';

export const initialState: Readonly<{ user: User | null }> = {
  user: null,
};

export const userAuthReducer = createReducer(
  initialState,
  on(userAuthActions.loginSuccessful, (state, { user }) => {
    return { user };
  }),
  on(userAuthActions.logoutSuccessful, state => {
    return { user: null };
  })
);
