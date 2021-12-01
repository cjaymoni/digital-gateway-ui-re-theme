export interface Comment {
  id?: string | number | any;
  text: string;
  author: Author[];
  parent: ParentComment[];
  post: number | any;
  upvote_count: number;
  downvote_count: number;
  score: number;
}

export interface SubComment {
  id?: string | number | any;
  text: string;
  author: Author[];
  parent: ParentComment[];
  post: number | any;
  upvote_count: number;
  downvote_count: number;
  score: number;
}
export interface ParentComment {
  id?: string | number | any;
  text: string;
  author: Author[];
  parent: null;
  post: number | any;
  upvote_count: number;
  downvote_count: number;
  score: number;
}

export interface Author {
  id?: string | number | any;
  username: string;
}
