import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

class MenuItemActions {
  readonly type = '[Menu Item Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ categories: Category[] | any[] }>()
  );

  selectMenuItem = createAction(
    `${this.type} Select MenuItem`,
    props<{ menuItemId: number }>()
  );

  clearSelection = createAction(`${this.type} Clear Selected MenuItem`);
}

export const menuItemActions = new MenuItemActions();
