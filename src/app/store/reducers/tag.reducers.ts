import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/models/tag.model';
import { tagActions } from '../actions/tag.actions';

export interface TagState extends EntityState<Tag> {}

export const tagEntityAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState: TagState = tagEntityAdapter.getInitialState();

export const tagReducer = createReducer(
  initialState,
  on(tagActions.fetchSuccessful, (state, { tags }) => {
    return tagEntityAdapter.setAll(tags, state);
  }),
  on(tagActions.addTagSuccessful, (state, { tag }) => {
    return tagEntityAdapter.addOne(tag, state);
  }),
  on(tagActions.editTagSuccessful, (state, { updatedTag }) => {
    return tagEntityAdapter.updateOne(updatedTag, state);
  }),
  on(tagActions.deleteTagSuccessful, (state, { id }) => {
    return tagEntityAdapter.removeOne(id, state);
  })
);
