export interface User {
  id?: number;
  email: string;
  name?: string;
  role: string;
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
  profile_type: ProfileType[];
  ghana_post?: string;
  district?: string;
  avatar?: Avatar[];
}

export interface Avatar {
  image: string;
  title: string;
}

export interface ProfileType {
  id?: string | number | any;
  name: string;
}
