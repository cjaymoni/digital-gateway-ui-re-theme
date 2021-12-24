import { VoteType } from '../config/app-config';
import { AppUploadedImage } from './article.model';
import { Comment } from './comments.model';

export interface Forum {
  id?: string | number | any;
  name: string;
  coverImage?: AppUploadedImage[];
  moderators?: Moderator[] | any;
  tags?: any;
  posts?: ForumPost[] | any;
  description?: string;
  slug?: string;
}

export interface ForumPost {
  id?: string | number | any;
  title: string;
  content?: string;
  comment_count?: number;
  submitter?: Submitter[] | any;
  upvotes?: number | any;
  downvotes?: number | any;
  score?: number | any;
  forums?: any;
  comments?: Comment[] | any;
  slug?: string;
  images?: AppUploadedImage[];
  created_on?: string;
  user?: {
    voted: boolean;
    type: VoteType;
  };
}

export interface Moderator {
  id?: string | number | any;
  username: string;
}
export interface Submitter {
  id?: string | number | any;
  username: string;
}
