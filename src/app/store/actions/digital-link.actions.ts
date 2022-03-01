import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { DigitalLink } from 'src/app/models/digital-link.model';

class DigitalLinkActions {
  readonly type = '[DigitalLink Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ digitalLink: DigitalLink[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectDigitalLink = createAction(
    `${this.type} Select DigitalLink`,
    props<{
      digitalLink: DigitalLink;
    }>()
  );

  selectDigitalLinkToEdit = createAction(
    `${this.type} Select DigitalLink To Edit`,
    props<{
      digitalLink: DigitalLink;
    }>()
  );

  selectDigitalLinkSuccess = createAction(
    `${this.type} Select DigitalLink Success`
  );

  searchDigitalLink = createAction(
    `${this.type} Search DigitalLink`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectDigitalLink = createAction(
    `${this.type} Find And Select DigitalLink`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectDigitalLinkById = createAction(
    `${this.type} Find And Select DigitalLink By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchDigitalLinkSuccess = createAction(
    `${this.type} Search DigitalLink Success`
  );

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ digitalLink: DigitalLink[] }>()
  );

  addDigitalLink = createAction(
    `${this.type} Add DigitalLink`,
    props<{ digitalLink: DigitalLink }>()
  );

  addDigitalLinkSuccessful = createAction(
    `${this.type} Add DigitalLink Successful`,
    props<{ digitalLink: DigitalLink }>()
  );

  editDigitalLink = createAction(
    `${this.type} Edit DigitalLink`,
    props<{
      digitalLink: DigitalLink;
    }>()
  );

  editDigitalLinkSuccessful = createAction(
    `${this.type} Edit DigitalLink Successful`,
    props<{ updatedDigitalLink: Update<DigitalLink> }>()
  );

  deleteDigitalLink = createAction(
    `${this.type} Delete DigitalLink`,
    props<{ id: number }>()
  );

  deleteDigitalLinkSuccessful = createAction(
    `${this.type} Delete DigitalLink Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected DigitalLink`);
}
export const digitalLinkActions = new DigitalLinkActions();
