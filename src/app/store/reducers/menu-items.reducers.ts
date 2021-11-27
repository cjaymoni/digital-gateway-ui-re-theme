import { createReducer, on } from '@ngrx/store';
import { Pages } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';
import { menuItemActions } from '../actions/menu-items.actions';

export const initialState: Readonly<MenuItemFromBackend> = {
  top_nav: [
    {
      label: 'Blog',
      id: 1,
      link: [Pages.Articles],
      items: [
        {
          label: 'Finance',
          id: 4,
          slug: 'finance',
          items: [
            {
              label: 'Finance',
              id: 4,
              slug: 'finance',
            },
            {
              label: 'Tax Policies',
              id: 5,
              slug: 'tax-policies',
            },
          ],
        },
        {
          label: 'Tax Policies',
          id: 5,
          slug: 'tax-policies',
        },
      ],
    },
    {
      label: 'Forum',
      id: 2,
      items: [
        {
          label: 'Most Read',
          id: 4,
          slug: 'most-read',
        },
        {
          label: 'Latest Posts',
          id: 5,
          slug: 'latest-posts',
        },
      ],
    },
    {
      label: 'Market Place',
      id: 3,
      link: [Pages.MarketPlace],
      items: [
        {
          label: 'Most Viewd',
          id: 4,
          slug: 'most-viewed',
        },
        {
          label: 'Latest Adverts',
          id: 5,
          slug: 'latest-adverts',
        },
      ],
    },
    {
      label: 'My Articles',
      id: 7,
      link: [Pages.Articles, 'my-articles'],
    },
    {
      label: 'My Fourm Posts',
      id: 8,
      link: [Pages.Forum, 'my-forum-posts'],
    },
  ],
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

const mapToMenuItems = () => {};
