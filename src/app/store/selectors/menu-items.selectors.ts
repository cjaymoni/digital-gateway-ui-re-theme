import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';

export const menus = createFeatureSelector<Readonly<MenuItemFromBackend>>(
  FeatureNamesForStore.Menu
);

class MenuItemSelectors {
  selectedMenu = createSelector(menus, menus => menus['selectedMenu']);

  menuItems = createSelector(menus, menus => menus['menus']);

  subMenuItems = createSelector(menus, menus => {
    const menu = (menus['menus'] as MenuItem[]).find(
      m => m.id === menus['selectedMenu']
    );

    return menu?.items || [];
  });

  topMenuItems = createSelector(menus, menus => menus['menus']);
}

export const menuItemSelectors = new MenuItemSelectors();
