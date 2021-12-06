import { createReducer, on } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { INFO_HUB_ID, Pages } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';
import { menuItemActions } from '../actions/menu-items.actions';
import { MainMenu } from './../../config/app-config';

export interface MenuState {
  menus: MenuItem[];
  selectedMenu: any;
}

export const initialState: Readonly<MenuState> = {
  menus: [...MainMenu],
  selectedMenu: null,
};

export const menuItemReducer = createReducer(
  initialState,
  on(menuItemActions.fetchSuccessful, (state, { menuItems }) => {
    const menuItemsCopy = [...state.menus];
    const newMenuItems = menuItemsCopy.map(mi => {
      const menuI = { ...mi };
      if (menuI.id === INFO_HUB_ID) {
        const menuItemCopy = [...menuItems];
        const itemsArray = (menuItemCopy as any[]).map(m => {
          const newMenu = { ...m };
          newMenu.label = m.name;
          newMenu.routerLink = [
            Pages.Articles.main,
            'search',
            m.slug.toLowerCase(),
          ];

          return newMenu;
        });

        // const addedViewArray =
        itemsArray.splice(0, 0, {
          id: 'view-add',
          label: 'View Recent Articles',
          routerLinkActiveOptions: [],
          routerLink: [Pages.Articles.main],
        });

        menuI.items = itemsArray;
      }
      return menuI;
    });

    return { ...state, menus: newMenuItems };
  }),
  on(menuItemActions.selectMenuItem, (state, { menuItemId }) => {
    return { ...state, selectedMenu: menuItemId };
  }),
  on(menuItemActions.clearSelection, state => {
    return { ...state, selectedMenu: null };
  })
);
