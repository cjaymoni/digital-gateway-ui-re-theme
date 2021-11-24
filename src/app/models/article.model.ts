export interface Article {
  id: string;
  title: string;
  body: string;
  slug: string;
  category?: any;
  tags?: any;
  status?: ArticlePublishedStatus;
  content?: string;
  meta_keywords?: string;
  meta_description?: string;
  meta_author?: string;
  is_page?: boolean;
  created_by?: number;
  images?: string[];
}

export enum ArticlePublishedStatus {
  Published = 'Published',
  Draft = 'Draft',
  Review = 'Review',
  Ready = 'Ready',
  Archived = 'Archived',
}
