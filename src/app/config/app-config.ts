import { UrlSegment } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ArticlePublishedStatus } from '../models/article.model';

export const MOBILE_WIDTH_BREAKPOINT = 600;
export const TABLET_WIDTH_BREAKPOINT = 960;
export const DEFAULT_PAGE_SIZE = 100;

export enum RouterOutlets {
  Main = 'main',
  Right = 'right-panel',
}

export enum FeatureNamesForStore {
  User = 'user',
  Router = 'router',
  Article = 'article',
  Tag = 'tag',
  Category = 'category',
  Menu = 'menuItem',
  ProductAd = 'productAd',
  Districts = 'district',
  ProductType = 'productType',
  Forum = 'forum',
  ForumPost = 'forumPost',
}

export const SLUG_PREFIX = 'read';

export interface IPageItems {
  main: string;
  myList: string;
  viewDetails: string;
  add: string;
  edit: string;
  view: string;
  matcher: () => UrlSegment | null;
}

export const Pages: { [key: string]: IPageItems | any } | any = {
  Articles: {
    main: 'articles',
    myList: 'my-articles',
    viewDetails: ':slug',
    add: 'post-article',
    edit: 'edit-article:id',
    view: 'view-article:id',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'article');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'article', false);
      },
    },
  },
  Forum: {
    main: 'forum',
    edit: 'edit-forum:id',
    view: 'view-forum:id',
    viewDetails: ':slug',
    myList: 'my-forums',
    add: 'post-forum',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'forum');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'forum', false);
      },
    },
  },
  ForumPost: {
    main: 'forum-post',
    edit: 'edit-forum-post:id',
    view: 'view-forum-post:id',
    viewDetails: ':slug',
    add: 'post-forum',
    myList: 'my-forum-post',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'forum-post');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'forum-post', false);
      },
    },
  },
  Auth: {
    login: 'login',
    signup: 'signup',
  },

  MarketPlace: {
    main: 'market-place',
    add: 'post-ad',
    edit: 'edit-ad:id',
    view: 'view-ad:id',
    viewDetails: 'ad-details/:id',
    myList: 'my-market-place',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'ad');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'ad', false);
      },
    },
  },

  Resources: {
    main: 'resources',
    add: 'post-resource',
  },

  //content management
  ContentManagement: 'content-management',
  SiteSettings: 'site-settings',
};

export const urlMatcherForEditAndView = (
  url: UrlSegment[],
  matcher: string,
  view = true
) => {
  const path: string = url[0]?.path;
  const startsWithViewOrEdit = view
    ? path.startsWith('view-' + matcher)
    : path.startsWith('edit-' + matcher)
    ? true
    : false;
  console.log(startsWithViewOrEdit);

  return startsWithViewOrEdit ? { consumed: url } : null;
};

export enum PrimeNgSeverity {
  Info = 'info',
  Danger = 'danger',
  Success = 'success',
  Warn = 'warn',
  Custom = 'custom',
  Error = 'error',
}

export const enum PrimeNgAlerts {
  SUCCESS = 'Success',
  INFO = 'Info',
  ERROR = 'Error',
  WARNING = 'Warn',
  UNOBSTRUSIVE = 'Unobstrusive',
}

export const PublishedStatusMapping: { [key: string]: string } = {
  [ArticlePublishedStatus.Archived]: PrimeNgSeverity.Warn,
  [ArticlePublishedStatus.Published]: PrimeNgSeverity.Success,
  [ArticlePublishedStatus.Draft]: PrimeNgSeverity.Info,
  [ArticlePublishedStatus.Review]: PrimeNgSeverity.Danger,
  [ArticlePublishedStatus.Ready]: PrimeNgSeverity.Custom,
};

export const TOAST_TIME = 3000;
export enum DialogPosition {
  LEFT = 'left',
  RIGHT = 'right',
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  TOP = 'top',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export enum TagType {
  forum = 'forum',
  article = 'article',
  product = 'product',
  ad = 'ad',
}

export const GenericErrorMessage =
  'Sorry, an error occurred. Rest assured, it will be fixed';

export const INFO_HUB_ID = 'info-hub';
export const MainMenu: MenuItem[] = [
  {
    id: INFO_HUB_ID,
    label: 'Information Hub',
    // routerLink: [Pages.Articles.main],
    icon: 'pi pi-folder-open',
    items: [],
  },
  {
    id: 'forum',
    label: 'Forums',
    icon: 'pi pi-discord',

    // routerLink: [Pages.Forum.main],
    items: [
      {
        id: 'view-forums',
        label: 'View Recent Forums',
        routerLinkActiveOptions: [],
        routerLink: [Pages.Forum.main],
      },
      {
        id: 'create-forum',
        label: 'Create A Post',
        routerLinkActiveOptions: [],
        routerLink: [Pages.Forum.main, Pages.Forum.add],
      },
    ],
  },
  {
    id: 'market-place',
    label: 'Market Place',
    icon: 'pi pi-shopping-bag',

    // routerLink: [Pages.MarketPlace.main],
    items: [
      {
        id: 'view-add',
        label: 'View Product Ads',
        routerLinkActiveOptions: [],
        routerLink: [Pages.MarketPlace.main],
      },
      {
        id: 'create-add',
        label: 'Create An Ad',
        routerLinkActiveOptions: [],
        routerLink: [Pages.MarketPlace.main, Pages.MarketPlace.add],
      },
    ],
  },
];

export const LoggedInMenu: MenuItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    // routerLink: [Pages.Articles.main],
    icon: 'pi pi-user',
  },
  {
    id: 'my-articles',
    label: 'My Articles',
    routerLink: [Pages.Articles.main, Pages.Articles.myList],
    icon: 'pi pi-list',
  },
  {
    id: 'my-forum-post',
    label: 'My Forum Posts',
    routerLink: [Pages.ForumPost.main, Pages.ForumPost.myList],
    icon: 'pi pi-list',
  },
  {
    id: 'my-market-ad',
    label: 'My Market Ads',
    routerLink: [Pages.MarketPlace.main, Pages.MarketPlace.myList],
    icon: 'pi pi-shopping-bag',
  },
  {
    id: 'site-settings',
    label: 'Site Settings',
    // routerLink: [Pages.Articles.main],
    icon: 'pi pi-cog',
  },
  {
    id: 'content-settings',
    label: 'Content Management',
    routerLink: [Pages.ContentManagement],
    icon: 'pi pi-cog',
  },
  {
    id: 'logout',
    label: 'Logout',
    // routerLink: [Pages.Articles.main],
    icon: 'pi pi-power-off',
  },
];
