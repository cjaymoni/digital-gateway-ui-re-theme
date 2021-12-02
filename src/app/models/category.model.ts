export interface Category {
  id?: number;
  slug: string;
  name: string;
  description: string;
  parent: number | null;
  is_active: boolean;
  created_by: number;
}
