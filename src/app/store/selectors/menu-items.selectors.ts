import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';
import { MenuState } from '../reducers/menu-items.reducers';

export const menuState = createFeatureSelector<Readonly<MenuState>>(
  FeatureNamesForStore.Menu
);

class MenuItemSelectors {
  selectedMenu = createSelector(menuState, state => state.selectedMenu);

  menuItems = createSelector(menuState, state => state.menus);

  subMenuItems = createSelector(menuState, state => {
    const menu = (state.menus as MenuItem[]).find(
      m => m.id === state.selectedMenu
    );

    return menu?.items || [];
  });

  topMenuItems = createSelector(menuState, state => state.menus);
}

export const menuItemSelectors = new MenuItemSelectors();
