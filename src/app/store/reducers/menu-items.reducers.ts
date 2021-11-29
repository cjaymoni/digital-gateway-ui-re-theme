import { createReducer, on } from '@ngrx/store';
import { Pages } from 'src/app/config/app-config';
import { MenuItemFromBackend } from 'src/app/models/menu-item.model';
import { menuItemActions } from '../actions/menu-items.actions';

export const initialState: Readonly<MenuItemFromBackend> = {
  top_nav: [
    {
      label: 'Information Hub',
      id: 1,
      link: [Pages.Articles],
      linkAndCommand: true,
      items: [
        {
          label: 'Finance',
          id: 6,
          slug: 'finance',
          items: [
            {
              label: 'All',
              id: 7,
              slug: 'finance',
              search: 'finance',
            },
            {
              label: 'Capital',
              id: 8,
              slug: 'tax-policies',
              search: 'tax-policies',
            },
          ],
        },
        {
          label: 'Tax Policies',
          id: 9,
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
          id: 10,
          slug: 'most-read',
        },
        {
          label: 'Latest Posts',
          id: 11,
          slug: 'latest-posts',
        },
      ],
    },
    {
      label: 'Market Place',
      id: 3,
      link: [Pages.MarketPlace],
      linkAndCommand: true,
      items: [
        {
          label: 'Post An Ad',
          id: 12,
          routerLink: [Pages.MarketPlace, Pages.add],
        },
        {
          label: 'Review My Ads',
          id: 13,
          routerLink: [Pages.MyMarketPlaceItems],
        },
      ],
    },
    {
      label: 'Article Moderation',
      id: 14,
      link: [Pages.Articles, 'my-articles'],
    },
    {
      label: 'Fourm Posts Moderation',
      id: 15,
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
