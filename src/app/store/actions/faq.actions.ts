import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { FAQ } from 'src/app/models/faqs.model';

class FaqActions {
  readonly type = '[Faq Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ faq: FAQ[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{
      error: any;
    }>()
  );

  selectFaq = createAction(
    `${this.type} Select Faq`,
    props<{
      faq: FAQ;
    }>()
  );

  selectFaqToEdit = createAction(
    `${this.type} Select Faq To Edit`,
    props<{
      faq: FAQ;
    }>()
  );

  selectFaqSuccess = createAction(`${this.type} Select Faq Success`);

  searchFaq = createAction(
    `${this.type} Search Faq`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectFaq = createAction(
    `${this.type} Find And Select Faq`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectFaqById = createAction(
    `${this.type} Find And Select Faq By Id`,
    props<{
      id: string | number;
    }>()
  );

  searchFaqSuccess = createAction(`${this.type} Search Faq Success`);

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ faq: FAQ[] }>()
  );

  addFaq = createAction(`${this.type} Add Faq`, props<{ faq: FAQ }>());

  addFaqSuccessful = createAction(
    `${this.type} Add Faq Successful`,
    props<{ faq: FAQ }>()
  );

  editFaq = createAction(
    `${this.type} Edit Faq`,
    props<{
      faq: FAQ;
    }>()
  );

  editFaqSuccessful = createAction(
    `${this.type} Edit Faq Successful`,
    props<{ updatedFaq: Update<FAQ> }>()
  );

  deleteFaq = createAction(`${this.type} Delete Faq`, props<{ id: number }>());

  deleteFaqSuccessful = createAction(
    `${this.type} Delete Faq Successful`,
    props<{ id: number }>()
  );

  clearAllSelected = createAction(`${this.type} Clear All Selected Faq`);
}
export const faqActions = new FaqActions();

