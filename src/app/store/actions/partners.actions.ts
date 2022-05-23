import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IPartners } from 'src/app/models/partners.model';

class PartnersActions {
  readonly type = '[Partners Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ partners: IPartners[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectPartner = createAction(
    `${this.type} Select Partners`,
    props<{
      partners: IPartners;
    }>()
  );

  selectPartnerToEdit = createAction(
    `${this.type} Select Partners To Edit`,
    props<{
      partners: IPartners;
    }>()
  );

  selectPartnerSuccess = createAction(
    `${this.type} Select Partners Success`
  );

  searchPartner = createAction(
    `${this.type} Search Partners`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectPartner = createAction(
    `${this.type} Find And Select Partners`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectPartnerById = createAction(
    `${this.type} Find And Select Partners By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchPartnerSuccess = createAction(
    `${this.type} Search Partners Success`
  );

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ partners: IPartners[] }>()
  );

  addPartner = createAction(
    `${this.type} Add Partners`,
    props<{ partners: IPartners; imageToUpload?: File[] | any[]; }>()
  );

  addPartnerSuccessful = createAction(
    `${this.type} Add Partners Successful`,
    props<{ partners: IPartners }>()
  );

  editPartner = createAction(
    `${this.type} Edit Partners`,
    props<{
      partners: IPartners;
      imageToUpload?: File[] | any[];
    }>()
  );

  editPartnerSuccessful = createAction(
    `${this.type} Edit Partners Successful`,
    props<{ updatedPartner: Update<IPartners> }>()
  );

  deletePartner = createAction(
    `${this.type} Delete Partners`,
    props<{ id: number }>()
  );

  deletePartnerSuccessful = createAction(
    `${this.type} Delete Partners Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected Partners`);
}
export const partnersActions = new PartnersActions();
