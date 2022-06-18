import { Roles } from '../config/app-config';

export interface User {
  id?: string | number | any;
  email: string;
  name?: string;
  role: Roles;
  first_name?: string;
  last_name?: string;
  profile?: UserProfile;
  is_verified?: boolean;
}

export interface UserToken {
  token: string;
}

export interface UserProfile {
  id?: string | number | any;
  name: string;
  website?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
  email: string;
  bio?: string;
  address?: string;
  profile_type?: ProfileType[];
  ghana_post?: string;
  district?: string;
  avatar?: string;
}

export interface Avatar {
  image: string;
  title: string;
}

export interface ProfileType {
  id?: string | number | any;
  name: string;
}

