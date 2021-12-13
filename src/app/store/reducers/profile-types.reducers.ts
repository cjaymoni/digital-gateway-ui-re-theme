import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProfileType } from '../../models/user-auth.model';
import { profileTypeActions } from '../actions/profile-type.actions';

export interface ProfileTypeState extends EntityState<ProfileType> {}

export const profileTypeEntityAdapter: EntityAdapter<ProfileType> =
  createEntityAdapter<ProfileType>();

export const initialState: ProfileTypeState =
  profileTypeEntityAdapter.getInitialState();

export const profileTypeReducer = createReducer(
  initialState,
  on(profileTypeActions.fetchSuccessful, (state, { profileTypes }) => {
    return profileTypeEntityAdapter.setAll(profileTypes, state);
  }),
  on(profileTypeActions.addProfileTypeSuccessful, (state, { profileType }) => {
    return profileTypeEntityAdapter.addOne(profileType, state);
  }),
  on(
    profileTypeActions.editProfileTypeSuccessful,
    (state, { updatedProfileType }) => {
      return profileTypeEntityAdapter.updateOne(updatedProfileType, state);
    }
  ),
  on(profileTypeActions.deleteProfileTypeSuccessful, (state, { id }) => {
    return profileTypeEntityAdapter.removeOne(id, state);
  })
);
