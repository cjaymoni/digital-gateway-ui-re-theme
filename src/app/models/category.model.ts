export interface Category {
  id?: number;
  slug: string;
  name: string;
  description: string;
  parent: number | null;
  is_active: boolean;
  created_by: number;
  subcategories?: Category[];
  image?: any;
  position?: CategoryPosition;
}

export enum CategoryPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

