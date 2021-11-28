export interface MarketPost {
  id?: string | number | any;
  name: string;
  description: string;
  price: number;
  brand?: string;
  product_type: ProductType[];
  tags?: any;
  images?: ProductImage[];
}

export interface ProductType {
  name: string;
  description: string;
  parent: string;
}

export interface ProductImage {
  image: string;
  title: string;
}
