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
}

export const SLUG_PREFIX = 'read';

export enum Pages {
  Articles = 'articles',
  Forum = 'forum',
  Login = 'login',
  MarketPlace = 'market-place',

  //Common Pages
  add = 'add',
  edit = 'edit',
  view = 'view',

  //Articles
  MyArticles = 'my-articles',
  MyForum = 'my-forum-posts',
  MyMarketPlaceItems = 'my-market-place-items',
}

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
