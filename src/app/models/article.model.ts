import { Category } from './category.model';

export interface Article {
  id?: string | number | any;
  title: string;
  body?: string;
  slug: string;
  category?: any;
  tags?: any;
  status?: ArticlePublishedStatus;
  content?: Category;
  meta_keywords?: string;
  meta_description?: string;
  meta_author?: string;
  is_page?: boolean;
  created_by?: number;
  images?: ArticleImage[];
}

export enum ArticlePublishedStatus {
  Published = 'Published',
  Draft = 'Draft',
  Review = 'Review',
  Ready = 'Ready',
  Archived = 'Archived',
}

export interface ArticleImage {
  image: string;
  title: string;
}
