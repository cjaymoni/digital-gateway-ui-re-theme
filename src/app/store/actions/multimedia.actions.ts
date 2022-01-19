import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { MultiMedia } from 'src/app/models/multimedia.model';

class MultiMediaActions {
  readonly type = '[Multimedia Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ multimedia: MultiMedia[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectMultiMedia = createAction(
    `${this.type} Select MultiMedia`,
    props<{
      multimedia: MultiMedia;
    }>()
  );

  selectMultiMediaToEdit = createAction(
    `${this.type} Select MultiMedia To Edit`,
    props<{
      multimedia: MultiMedia;
    }>()
  );

  selectMultiMediaSuccess = createAction(
    `${this.type} Select MultiMedia Success`
  );

  searchMultiMedia = createAction(
    `${this.type} Search MultiMedia`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectMultiMedia = createAction(
    `${this.type} Find And Select MultiMedia`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectMultiMediaById = createAction(
    `${this.type} Find And Select MultiMedia By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchMultiMediaSuccess = createAction(
    `${this.type} Search MultiMedia Success`
  );

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ multimedia: MultiMedia[] }>()
  );

  addMultiMedia = createAction(
    `${this.type} Add MultiMedia`,
    props<{ multimedia: MultiMedia }>()
  );

  addMultiMediaSuccessful = createAction(
    `${this.type} Add MultiMedia Successful`,
    props<{ multimedia: MultiMedia }>()
  );

  editMultiMedia = createAction(
    `${this.type} Edit MultiMedia`,
    props<{
      multimedia: MultiMedia;
    }>()
  );

  editMultiMediaSuccessful = createAction(
    `${this.type} Edit MultiMedia Successful`,
    props<{ updatedMultiMedia: Update<MultiMedia> }>()
  );

  deleteMultiMedia = createAction(
    `${this.type} Delete MultiMedia`,
    props<{ id: number }>()
  );

  deleteMultiMediaSuccessful = createAction(
    `${this.type} Delete MultiMedia Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected MultiMedia`);
}
export const multimediaActions = new MultiMediaActions();
