import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TagType } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Category } from 'src/app/models/category.model';
import { ProductType } from 'src/app/models/product-ad.model';
import { Tag } from 'src/app/models/tag.model';
import { categoryActions } from 'src/app/store/actions/category.actions';
import { productTypeActions } from 'src/app/store/actions/product-type.actions';
import { tagActions } from 'src/app/store/actions/tag.actions';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import { productTypeSelectors } from 'src/app/store/selectors/product-type.selectors';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-content-management-list-page',
  templateUrl: './content-management-list-page.component.html',
  styleUrls: ['./content-management-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentManagementListPageComponent implements OnInit {
  TagTypes = TagType;

  constructor(private store: Store) {}

  productTags$ = this.store.select(tagSelectors.productTags);
  articleTags$ = this.store.select(tagSelectors.articleTags);
  forumTags$ = this.store.select(tagSelectors.forumTags);
  adTags$ = this.store.select(tagSelectors.adTags);
  category$ = this.store.select(categorySelectors.all);
  productTypes$ = this.store.select(productTypeSelectors.all);

  ngOnInit() {}

  removeTag(tag: Tag) {
    this.store.dispatch(
      tagActions.deleteTag({
        id: tag.id || 0,
      })
    );
  }

  addTag(tagName: string, tagType: TagType) {
    this.store.dispatch(
      tagActions.addTag({
        tag: {
          name: tagName,
          slug: slugify(tagName),
          tag_type: tagType,
        },
      })
    );
  }

  removeCategory(category: Category) {
    this.store.dispatch(
      categoryActions.deleteCategory({
        id: category.id || 0,
      })
    );
  }

  addCategory(categoryName: string) {
    this.store.dispatch(
      categoryActions.addCategory({
        category: {
          name: categoryName,
          slug: slugify(categoryName),
          created_by: 1,
          is_active: true,
          description: categoryName,
          parent: null,
        },
      })
    );
  }

  addProductType(productTypeName: string) {
    this.store.dispatch(
      productTypeActions.addProductType({
        productType: {
          name: productTypeName,
          description: productTypeName,
          parent: null,
        },
      })
    );
  }

  removeProductType(productType: ProductType) {
    this.store.dispatch(
      productTypeActions.deleteProductType({
        id: productType.id || 0,
      })
    );
  }
}
