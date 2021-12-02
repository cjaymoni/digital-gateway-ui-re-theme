import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

class CategoryActions {
  readonly type = '[Category Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ categories: Category[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{ error: any }>()
  );

  addCategory = createAction(
    `${this.type} Add Category`,
    props<{ category: Category }>()
  );

  addCategorySuccessful = createAction(
    `${this.type} Add Category Successful`,
    props<{ category: Category }>()
  );

  editCategory = createAction(
    `${this.type} Edit Category`,
    props<{ category: Category }>()
  );

  editCategorySuccessful = createAction(
    `${this.type} Edit Category Successful`,
    props<{ updatedCategory: Update<Category> }>()
  );

  deleteCategory = createAction(
    `${this.type} Delete Category`,
    props<{ id: number }>()
  );

  deleteCategorySuccessful = createAction(
    `${this.type} Delete Category Successful`,
    props<{ id: number }>()
  );
}

export const categoryActions = new CategoryActions();
