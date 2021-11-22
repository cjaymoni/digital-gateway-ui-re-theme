import { User } from '../models/user-auth.model';

export interface AppState {
  userAuth: Readonly<User>;
}
