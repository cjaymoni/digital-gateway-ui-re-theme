import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/models/tag.model';

class TagActions {
  readonly type = '[Tag Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ tags: Tag[] }>()
  );

  fetchError = createAction(`${this.type} Fetch Error`);

  addTag = createAction(`${this.type} Add Tag`, props<{ tag: Tag }>());

  addTagSuccessful = createAction(
    `${this.type} Add Tag Successful`,
    props<{ tag: Tag }>()
  );

  editTag = createAction(`${this.type} Edit Tag`, props<{ tag: Tag }>());

  editTagSuccessful = createAction(
    `${this.type} Edit Tag Successful`,
    props<{ updatedTag: Update<Tag> }>()
  );

  deleteTag = createAction(`${this.type} Delete Tag`, props<{ id: number }>());

  deleteTagSuccessful = createAction(
    `${this.type} Delete Tag Successful`,
    props<{ id: number }>()
  );
}

export const tagActions = new TagActions();
