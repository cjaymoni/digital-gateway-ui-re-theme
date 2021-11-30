import { ArticleEffects } from './effects/article.effects';
import { CategoryEffects } from './effects/category.effects';
import { DistrictEffects } from './effects/district.effects';
import { ProductAdEffects } from './effects/product-ad.effects';
import { ProductTypeEffects } from './effects/product-type.effects';
import { TagEffects } from './effects/tag.effects';

export const appStoreEffects = [
  ArticleEffects,
  CategoryEffects,
  TagEffects,
  ProductAdEffects,
  DistrictEffects,
  ProductTypeEffects,
];
