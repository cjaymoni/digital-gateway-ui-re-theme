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
  subcomments?: any[];
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
}

export interface Author {
  id?: string | number | any;
  username: string;
}
