import { UrlSegment } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ArticlePublishedStatus } from '../models/article.model';
import { Forum } from '../models/forum.model';
import { CREATE_AD, CREATE_RESOURCE } from './activity-roles';

export const MOBILE_WIDTH_BREAKPOINT = 600;
export const TABLET_WIDTH_BREAKPOINT = 960;
export const DEFAULT_PAGE_SIZE = 50;

export const APP_TOKEN = 'app_token';
export const APP_USER_TOKEN = 'app_user_access_token';
export const APP_REFRESH_TOKEN = 'app_refresh_token';
export const LOGIN_PATH = 'login';

export const POLLING_INTERVAL = 10000; // 5 SECONDS

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
  DigitalLink = 'digitalLink',
  Partners = 'partners',
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
    moderation: 'moderation',
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
    links: 'direct-links',
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
  DigitalLinks: {
    main: 'direct-links',
    add: 'post-link',
    edit: 'edit-link/:id',
    view: 'view-link/:id',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'direct-links');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'direct-links', false);
      },
    },
  },
  Partners: {
    main: 'partners',
    add: 'post-partner',
    edit: 'edit-partner/:id',
    view: 'view-partner/:id',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'partners');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'partners', false);
      },
    },
  },
  //content management
  ContentManagement: 'content-management',
  SiteSettings: 'site-settings',
  UserProfile: 'user-profile',
  SignUp: 'sign-up',
  Login: 'login',
  UserManagement: {
    main: 'user-management',
    add: 'post-user',
    edit: 'edit-user/:id',
    view: 'view-user/:id',
    matcher: {
      view: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'user-management');
      },
      edit: (url: UrlSegment[]) => {
        return urlMatcherForEditAndView(url, 'user-management', false);
      },
    },
  },
  AboutUs: 'about-us',

  Category: {
    main: 'category',
    add: 'add-category',
    edit: 'edit-category/:id',
    view: 'view-category/:id',
  },

  Tag: {
    main: 'tag',
    add: 'add-tag',
    edit: 'edit-tag/:id',
    view: 'view-tag/:id',
  },
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
      visible: userRole === Roles.Admin || userRole === Roles.Editor,
    },
    {
      id: 'my-forum-post',
      label: 'My Forum Posts',
      routerLink: [Pages.ForumPost.main, Pages.ForumPost.myList],
      icon: 'pi pi-list',
      visible: userRole === Roles.Admin || userRole === Roles.Editor,
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
      routerLink: [Pages.UserManagement.main],
      icon: 'pi pi-users',
      visible: userRole === Roles.Admin,
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
    {
      id: 'direct-links',
      label: 'Direct Links',
      routerLink: [Pages.DigitalLinks.main],
      icon: 'pi pi-link',
      visible: userRole === Roles.Admin || userRole === Roles.Editor,
    },
    {
      id: 'partners',
      label: 'Partners',
      routerLink: [Pages.Partners.main],
      icon: 'pi pi-users',
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

export const trackById = (index: number, data: any): number => {
  return data.id;
};

export const trackByAny = (key: string) => {
  return function (index: number, data: any) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let retrievedData: any;
      let currentData: any;
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (index === 0) {
          currentData = { ...data[key] };
        } else {
          retrievedData = currentData[key];
        }
      }
      return retrievedData;
    }
    return data[key];
  };
};
(index: number, data: any): number => {
  return data.id;
};

export enum Roles {
  Contributor = 'contributor',
  Reporter = 'reporter',
  Admin = 'admin',
  Editor = 'editor',
  ServiceProvider = 'service',
}

export const UserRoleMapping: { [key: string]: string } = {
  [Roles.Admin]: PrimeNgSeverity.Error,
  [Roles.Editor]: PrimeNgSeverity.Success,
  [Roles.Contributor]: PrimeNgSeverity.Info,
  [Roles.ServiceProvider]: PrimeNgSeverity.Warn,
  [Roles.Reporter]: PrimeNgSeverity.Info,
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage?.getItem(APP_USER_TOKEN) || '{}');
  return user.role;
};

export const MainMenu: MenuItem[] = [
  {
    id: INFO_HUB_ID,
    label: 'Information Hub',
    icon: 'pi pi-folder-open',
    routerLinkActiveOptions: { exact: true },
    items: [],
  },
  {
    id: 'forum',
    label: "Entrepreneurs' Forum",
    icon: 'pi pi-discord',
    routerLinkActiveOptions: { paths: 'subset' },
    state: { route: Pages.Forum.main },
    items: [
      {
        id: 'view-forums',
        label: 'View Forums',
        icon: 'pi pi-eye',
        routerLink: [Pages.Forum.main],
        routerLinkActiveOptions: { exact: true },
      },
      {
        id: 'create-forum',
        label: 'Create A Forum',
        icon: 'pi pi-plus',
        routerLink: [Pages.Forum.main, Pages.Forum.add],
        routerLinkActiveOptions: { exact: true },
        visible: (() => {
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
  {
    id: 'market-place',
    label: 'Market Place',
    icon: 'pi pi-shopping-bag',
    routerLinkActiveOptions: { paths: 'subset' },
    items: [
      {
        id: 'view-add',
        label: 'View Product Ads',
        icon: 'pi pi-eye',
        routerLink: [Pages.MarketPlace.main],
        routerLinkActiveOptions: { exact: true },
      },
      {
        id: 'create-add',
        label: 'Create An Ad',
        icon: 'pi pi-plus',
        routerLink: [Pages.MarketPlace.main, Pages.MarketPlace.add],
        routerLinkActiveOptions: { exact: true },
        disabled: (() => {
          const userRole = getUserRole();
          return CREATE_AD(userRole);
        })(),
      },
    ],
  },
  {
    id: 'resource',
    label: 'Resources',
    icon: 'pi pi-file-o',
    routerLinkActiveOptions: { paths: 'subset' },
    items: [
      {
        id: 'view-resources',
        label: 'Reports',
        icon: 'pi pi-file',
        routerLink: [Pages.Resources.main],
        routerLinkActiveOptions: { exact: true },
      },
      {
        id: 'create-resource',
        label: 'Add Resource',
        icon: 'pi pi-plus',
        routerLink: [Pages.Resources.main, Pages.Resources.add],
        visible: (() => {
          const userRole = getUserRole();
          return CREATE_RESOURCE(userRole);
        })(),
        routerLinkActiveOptions: { exact: true },
      },

      {
        id: 'view-links',
        label: 'Direct Links',
        icon: 'pi pi-link',
        routerLink: [Pages.Resources.main, Pages.Resources.links],
        routerLinkActiveOptions: { exact: true },
      },
    ],
  },
];

export const MAX_FEATURED_CATEGORIES = 6;

export const ERROR_MESSAGES_MAPPING = {
  errors: {
    useValue: {
      required: 'This field is required',
      minlength: ({ requiredLength, actualLength }: any) =>
        `Please enter ${requiredLength} or more characters. Current count: ${actualLength}`,
      maxlength: ({ requiredLength, actualLength }: any) =>
        `Please enter  ${requiredLength} or less characters. Current count: ${actualLength}`,
      email: () => `Please enter a valid email`,
    },
  },
};

export const TODAY_TOPICS = 'today';
export const TODAY_FORUM: Forum = {
  name: "Today's Forum Topics",
  description:
    'This forum contains all topics that have been posted today. You cannot directly add a topic to this forum',
  created_on: new Date().toString(),
  slug: TODAY_TOPICS,
  count: 0,
  icon: 'pi pi-star-fill',
  moderators: [
    {
      first_name: 'MSME GATEWAY',
    },
  ],
};

export const anchorErrorComponentFn = (
  hostElement: Element,
  errorElement: Element
) => {
  let errorNode: Element | null | undefined = hostElement?.querySelector(
    'custom-control-error'
  );

  const isInputGroup =
    hostElement?.parentElement?.classList.contains('p-inputgroup');

  if (isInputGroup) {
    hostElement?.parentElement?.insertAdjacentElement('afterend', errorElement);
    errorNode = hostElement?.parentElement?.querySelector(
      'custom-control-error'
    );
  } else {
    hostElement?.insertAdjacentElement('afterend', errorElement);
  }

  return () => {
    if (errorNode) {
      errorNode.remove();
    }
  };
};

