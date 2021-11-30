import { createAction, props } from '@ngrx/store';
import { District } from 'src/app/models/district.model';

class DistrictActions {
  readonly type = '[District Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ districts: District[] }>()
  );

  fetchError = createAction(`${this.type} Fetch Error`);
}

export const districtActions = new DistrictActions();
