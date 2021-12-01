import { AppUploadedImage } from './article.model';
import { Comment } from './comments.model';

export interface Forum {
  id?: string | number | any;
  name: string;
  coverImage: AppUploadedImage[];
  moderators: Moderator[];
  tags: any;
  posts: ForumPost[];
}

export interface ForumPost {
  id?: string | number | any;
  title: string;
  content: string;
  comment_count: number;
  submitter: Submitter[];
  upvote_count: number;
  downvote_count: number;
  score: number;
  forums: any;
  comments: Comment[];
}

export interface Moderator {
  id?: string | number | any;
  username: string;
}
export interface Submitter {
  id?: string | number | any;
  username: string;
}
