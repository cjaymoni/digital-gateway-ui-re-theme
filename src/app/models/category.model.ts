export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  parent: number;
  is_active: boolean;
  created_by: number;
}
