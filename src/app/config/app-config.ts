import { UrlSegment } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ArticlePublishedStatus } from '../models/article.model';

export const MOBILE_WIDTH_BREAKPOINT = 600;
export const TABLET_WIDTH_BREAKPOINT = 960;
export const DEFAULT_PAGE_SIZE = 50;

export const APP_TOKEN = 'app_token';
export const APP_USER_TOKEN = 'app_user_access_token';
export const APP_REFRESH_TOKEN = 'app_refresh_token';
export const LOGIN_PATH = 'login';

export enum RouterOutlets {
  Main = 'main',
  Right = 'right-panel',
  Modal = 'modal',
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
  ProfileType = 'profileType',
  UserProfile = 'userProfile',
  UsersList = 'usersList',
  MultiMedia = 'multiMedia',
}

export const SLUG_PREFIX = 'read';

export interface IPageItems {
  main: string;
  myList: string;
  viewDetails: string;
  viewPostDetails: string;
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
    edit: 'edit-article/:article-id',
    view: 'view-article/:article-id',

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
    edit: 'edit-forum/:forum-id',
    view: 'view-forum/:forum-id',
    viewDetails: ':slug',
    viewPostDetails: ':slug/:id',
    viewPost: ':slug/post/:post-slug',
    myList: 'my-forums',
    add: 'post-forum',
    viewSubComments: 'comments/:comment-id',
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
    edit: 'edit-forum-post/:forum-post-id',
    view: 'view-forum-post/:forum-post-id',
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
    signup: 'sign-up',
  },

  MarketPlace: {
    main: 'market-place',
    add: 'post-ad',
    edit: 'edit-ad/:id',
    view: 'view-ad/:id',
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
  MultimediaManagement: {
    main: 'multimedia-management',
    add: 'post-media',
    edit: 'edit-media/:id',
    view: 'view-media/:id',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'multimedia-management');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'multimedia-management', false);
      },
    },
  },
  //content management
  ContentManagement: 'content-management',
  SiteSettings: 'site-settings',
  UserProfile: 'user-profile',
  SignUp: 'sign-up',
  Login: 'login',
  UserManagement: 'user-management',
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
  [ArticlePublishedStatus.Archived]: PrimeNgSeverity.Error,
  [ArticlePublishedStatus.Published]: PrimeNgSeverity.Success,
  [ArticlePublishedStatus.Draft]: PrimeNgSeverity.Info,
  [ArticlePublishedStatus.Review]: PrimeNgSeverity.Warn,
  [ArticlePublishedStatus.Ready]: PrimeNgSeverity.Success,
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

export enum SearchList {
  ARTICLE = 'article',
  ADS = 'ad',
  FORUM = 'forum',
  FORUM_POST = 'post',
}

export const GenericErrorMessage =
  'Sorry, an error occurred. Rest assured, it will be fixed';

export const INFO_HUB_ID = 'info-hub';

export const LoggedInMenu = (userRole: Roles): MenuItem[] => {
  return [
    {
      id: 'profile',
      label: 'Profile',
      routerLink: [Pages.UserProfile],
      icon: 'pi pi-user',
    },
    {
      id: 'my-articles',
      label: 'Article Moderation',
      routerLink: [Pages.Articles.main, Pages.Articles.myList],
      icon: 'pi pi-list',
      visible:
        userRole === Roles.Admin ||
        userRole === Roles.Editor ||
        userRole === Roles.Contributor,
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
      routerLink: [Pages.SiteSettings],
      icon: 'pi pi-cog',
      visible: userRole === Roles.Admin,
    },
    {
      id: 'user-management',
      label: 'User Management',
      routerLink: [Pages.UserManagement],
      icon: 'pi pi-users',
    },
    {
      id: 'content-settings',
      label: 'Content Management',
      routerLink: [Pages.ContentManagement],
      icon: 'pi pi-cog',
      visible: userRole === Roles.Admin || userRole === Roles.Editor,
    },
    {
      id: 'multimedia-management',
      label: 'Multimedia Management',
      routerLink: [Pages.MultimediaManagement.main],
      icon: 'pi pi-video',
      visible: userRole === Roles.Admin || userRole === Roles.Editor,
    },
  ];
};

export const SignUpMenu: MenuItem[] = [
  {
    id: 'sign-up',
    label: 'Sign Up',
    routerLink: [Pages.SignUp],
    icon: 'pi pi-user',
  },
  {
    id: 'profile',
    label: 'Login',
    routerLink: [Pages.Login],
    icon: 'pi pi-user',
  },
];

export enum Context {
  Article = Pages.Articles.main,
  Forum = Pages.Forum.main,
  ForumPost = Pages.ForumPost.main,
  MarketPlace = Pages.MarketPlace.main,
  MultimediaManagement = Pages.MultimediaManagement.main,
  // Auth = Pages.Auth.
}

export enum VoteType {
  downvote = 'D',
  upvote = 'U',
}

export enum CommentType {
  ForumPost,
  Comment,
}

export const trackById = (index: number, comment: any): number => {
  return comment.id;
};

export enum Roles {
  Contributor = 'contributor',
  Moderator = 'moderator',
  Admin = 'admin',
  Editor = 'editor',
  ServiceProvider = 'service_provider',
}

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem(APP_USER_TOKEN) || '{}');
  return user.role;
};

export const MainMenu: MenuItem[] = [
  {
    id: INFO_HUB_ID,
    label: 'Information Hub',
    icon: 'pi pi-folder-open',
    items: [],
  },
  {
    id: 'forum',
    label: 'Forums',
    icon: 'pi pi-discord',
    items: [
      {
        id: 'view-forums',
        label: 'View Forums',
        icon: 'pi pi-eye',
        routerLink: [Pages.Forum.main],
      },
      {
        id: 'create-forum',
        label: 'Create A Forum',
        icon: 'pi pi-plus',
        routerLink: [Pages.Forum.main, Pages.Forum.add],
      },
    ],
  },
  {
    id: 'market-place',
    label: 'Market Place',
    icon: 'pi pi-shopping-bag',
    items: [
      {
        id: 'view-add',
        label: 'View Product Ads',
        icon: 'pi pi-eye',
        routerLink: [Pages.MarketPlace.main],
      },
      {
        id: 'create-add',
        label: 'Create An Ad',
        icon: 'pi pi-plus',
        routerLink: [Pages.MarketPlace.main, Pages.MarketPlace.add],
      },
    ],
  },
  {
    id: 'resource',
    label: 'Resource',
    icon: 'pi pi-file-o',
    items: [
      {
        id: 'view-resources',
        label: 'View Resource',
        icon: 'pi pi-eye',
        routerLink: [Pages.Resources.main],
      },
      {
        id: 'create-resource',
        label: 'Add Resource',
        icon: 'pi pi-plus',
        routerLink: [Pages.Resources.main, Pages.Resources.add],
        disabled: (() => {
          const userRole = getUserRole();
          return (
            userRole === Roles.Admin ||
            userRole === Roles.Editor ||
            userRole === Roles.ServiceProvider
          );
        })(),
      },
    ],
  },
];

export const MAX_FEATURED_CATEGORIES = 8;
