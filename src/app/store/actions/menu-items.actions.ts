import { createAction, props } from '@ngrx/store';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';

class MenuItemActions {
  readonly type = '[Menu Item Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ menuItems: MenuItemFromBackend }>()
  );

  selectMenuItem = createAction(
    `${this.type} Select MenuItem`,
    props<{ menuItemId: number }>()
  );

  clearSelection = createAction(`${this.type} Clear Selected MenuItem`);
}

export const menuItemActions = new MenuItemActions();
