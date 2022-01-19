import { User } from './user-auth.model';

export interface MultiMedia {
  id?: string | number | any;
  featured: boolean;
  url: string;
  media_type: MultiMediaType[];
  author: number;
}

export interface MultiMediaType {
  id?: string | number | any;
  name: string;
}
