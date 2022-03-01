import { createReducer, on } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { INFO_HUB_ID, Pages } from 'src/app/config/app-config';
import { Category } from 'src/app/models/category.model';
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
  on(menuItemActions.fetchSuccessful, (state, { categories }) => {
    const menuItemsCopy = [...state.menus];
    const newMenuItems = menuItemsCopy.map(mi => {
      const menuI = { ...mi };
      if (menuI.id === INFO_HUB_ID) {
        const menuItemCopy: Category[] = [...categories];

        const itemsArray: MenuItem[] = [];

        for (const category of menuItemCopy) {
          if (!category.parent) {
            const menu = convertToMenu(category);
            itemsArray.push(menu);
          }
        }

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

const convertToMenu = (category: Category, tag = false): MenuItem => {
  const name = category.name;
  const menuItem: MenuItem = {
    label: name.charAt(0).toUpperCase() + name.slice(1),
    routerLink: [Pages.Articles.main, 'search', category.slug.toLowerCase()],
    icon: tag ? 'pi pi-tag' : '',
  };

  if (category.subcategories!.length > 0) {
    const copySub = [...category.subcategories!];
    const subs = [];

    for (const category of copySub) {
      const subMenu = convertToMenu(category, true);
      subs.push(subMenu);
    }
    menuItem.items = subs;
  }
  return menuItem;
};
