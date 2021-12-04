import { AppUploadedImage } from './article.model';
import { Tag } from './tag.model';
import { User } from './user-auth.model';

export interface ProductAd {
  id?: number;
  gh_post: string;
  location: string;
  expires: string;
  cellphone: string;
  district: null;
  email: string;
  author: User;
  product: Product;
}

export interface ProductType {
  name: string;
  description: string;
  parent: string | null;
  id?: number;
}

export interface Product {
  id?: string | number | any;
  name: string;
  description: string;
  price: string;
  brand: string;
  product_type: ProductType[];
  tags: Tag[];
  images: AppUploadedImage[];
}
