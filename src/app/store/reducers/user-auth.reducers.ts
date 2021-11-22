import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user-auth.model';
import { userAuthActions } from '../actions/user-auth.actions';

export const initialState: Readonly<User> = {
  email: 'testuser@test.com',
  name: 'Owuraku User',
};

export const userAuthReducer = createReducer(
  initialState,
  on(userAuthActions.loginSuccessful, (state, { user }) => {
    return { ...state, ...user };
  })
);
