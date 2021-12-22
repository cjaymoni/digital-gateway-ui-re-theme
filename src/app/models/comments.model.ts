import { VoteType } from '../config/app-config';

export interface Comment {
  id?: string | number | any;
  text: string;
  author: Author | any;
  parent?: ParentComment[];
  post: number | any;
  upvotes?: number | any;
  downvotes?: number | any;
  score?: number;
  slug?: string;
  created_on?: string;
  subcomments?: any[];
  user?: {
    voted: boolean;
    type: VoteType;
  };
}

export interface SubComment {
  id?: string | number | any;
  text: string;
  author: Author[];
  parent: ParentComment[];
  post: number | any;
  upvotes: number;
  downvotes: number;
  score: number;
  user?: {
    voted: boolean;
    type: VoteType;
  };
}
export interface ParentComment {
  id?: string | number | any;
  text: string;
  author: Author[];
  parent: null;
  post: number | any;
  upvotes: number;
  downvotes: number;
  score: number;
  user?: {
    voted: boolean;
    type: VoteType;
  };
}

export interface Author {
  id?: string | number | any;
  username: string;
}
