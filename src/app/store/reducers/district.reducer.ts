import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { District } from 'src/app/models/district.model';
import { districtActions } from '../actions/district.actions';

export interface DistrictState extends EntityState<District> {}

export const districtEntityAdapter: EntityAdapter<District> =
  createEntityAdapter<District>();

export const initialState: DistrictState =
  districtEntityAdapter.getInitialState();

export const districtReducer = createReducer(
  initialState,
  on(districtActions.fetchSuccessful, (state, { districts }) => {
    return districtEntityAdapter.setAll(districts, state);
  })
);
