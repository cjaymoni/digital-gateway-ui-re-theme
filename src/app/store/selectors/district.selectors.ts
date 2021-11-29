import { createFeatureSelector } from '@ngrx/store';
import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { districtEntityAdapter } from './../reducers/district.reducer';
import { FeatureNamesForStore } from '../../config/app-config';

const categoryFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.Districts
);
class DistrictSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(districtEntityAdapter, categoryFeatureSelector);
  }
}

export const districtSelectors = new DistrictSelectors();
