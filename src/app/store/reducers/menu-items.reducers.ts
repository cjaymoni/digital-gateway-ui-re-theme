import { createReducer, on } from '@ngrx/store';
import { Pages } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';
import { menuItemActions } from '../actions/menu-items.actions';
import { MainMenu } from './../../config/app-config';

export const initialState: Readonly<MenuItemFromBackend> = {
  menus: MainMenu,
  selectedMenu: null,
};

export const menuItemReducer = createReducer(
  initialState,
  on(menuItemActions.fetchSuccessful, (state, { menuItems }) => {
    return { ...menuItems };
  }),
  on(menuItemActions.selectMenuItem, (state, { menuItemId }) => {
    return { ...state, selectedMenu: menuItemId };
  }),
  on(menuItemActions.clearSelection, state => {
    return { ...state, selectedMenu: null };
  })
);
