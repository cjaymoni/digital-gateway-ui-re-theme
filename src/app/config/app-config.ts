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
}

export const SLUG_PREFIX = 'read';

export enum Pages {
  Articles = 'articles',
  Forum = 'forum',
  Login = 'login',

  //Common Pages
  add = 'add',
  edit = 'edit',
  view = 'view',

  //Articles
  MyArticles = 'my-articles',
  MyForum = 'my-fourum-posts',
  MyMarketPlaceItems = 'my-market-place-items',
}

export enum PrimeNgSeverity {
  Info = 'info',
  Danger = 'danger',
  Success = 'success',
  Warn = 'warn',
  Custom = 'custom',
}

export const PublishedStatusMapping: { [key: string]: string } = {
  [ArticlePublishedStatus.Archived]: PrimeNgSeverity.Warn,
  [ArticlePublishedStatus.Published]: PrimeNgSeverity.Success,
  [ArticlePublishedStatus.Draft]: PrimeNgSeverity.Info,
  [ArticlePublishedStatus.Review]: PrimeNgSeverity.Danger,
  [ArticlePublishedStatus.Ready]: PrimeNgSeverity.Custom,
};
