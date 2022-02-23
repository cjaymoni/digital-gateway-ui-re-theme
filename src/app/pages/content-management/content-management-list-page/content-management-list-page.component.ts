import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TagType } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Category } from 'src/app/models/category.model';
import { ProductType } from 'src/app/models/product-ad.model';
import { Tag } from 'src/app/models/tag.model';
import { NavigatorService } from 'src/app/services/navigator.service';
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

  categoryForm!: FormGroup;

  tagFeatured = new FormControl(false);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private navigator: NavigatorService
  ) {}

  productTags$ = this.store.select(tagSelectors.productTags);
  articleTags$ = this.store.select(tagSelectors.articleTags);
  forumTags$ = this.store.select(tagSelectors.forumTags);
  adTags$ = this.store.select(tagSelectors.adTags);
  category$ = this.store.select(categorySelectors.all);
  productTypes$ = this.store.select(productTypeSelectors.all);

  ngOnInit() {
    this.categoryForm = this.fb.group({
      category: ['', [Validators.required]],
    });
  }

  get category() {
    return this.categoryForm.get('category') as FormControl;
  }

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
          featured: this.tagFeatured.value,
        },
      })
    );
    this.tagFeatured.setValue(false);
  }

  removeCategory(category: Category) {
    this.store.dispatch(
      categoryActions.deleteCategory({
        id: category.id || 0,
      })
    );
  }

  addCategory(categoryName: string) {
    this.navigator.contentManagement.gotoAddCategoryPage();

    // this.store.dispatch(
    //   categoryActions.addCategory({
    //     category: {
    //       name: categoryName,
    //       slug: slugify(categoryName),
    //       created_by: 1,
    //       is_active: true,
    //       description: categoryName,
    //       parent: this.categoryForm.value.category.id,
    //     },
    //   })
    // );
  }

  editCategory(category: Category) {
    this.navigator.contentManagement.gotoEditCategoryPage(category.id);
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
