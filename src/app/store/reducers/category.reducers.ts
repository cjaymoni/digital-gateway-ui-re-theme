import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { categoryActions } from '../actions/category.actions';

export interface CategoryState extends EntityState<Category> {}

export const categoryEntityAdapter: EntityAdapter<Category> =
  createEntityAdapter<Category>();

export const initialState: CategoryState =
  categoryEntityAdapter.getInitialState();

export const categoryReducer = createReducer(
  initialState,
  on(categoryActions.fetchSuccessful, (state, { categories }) => {
    return categoryEntityAdapter.setAll(categories, state);
  }),
  on(categoryActions.addCategorySuccessful, (state, { category }) => {
    return categoryEntityAdapter.addOne(category, state);
  }),
  on(categoryActions.editCategorySuccessful, (state, { updatedCategory }) => {
    return categoryEntityAdapter.updateOne(updatedCategory, state);
  }),
  on(categoryActions.deleteCategorySuccessful, (state, { id }) => {
    return categoryEntityAdapter.removeOne(id, state);
  })
);
