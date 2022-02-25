import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Subscription, tap } from 'rxjs';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Category } from 'src/app/models/category.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { categoryActions } from 'src/app/store/actions/category.actions';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import {
  selectRouteNestedParams,
  selectRouteParam,
} from 'src/app/store/selectors/router.selectors';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @ViewChild('imageUpload', { static: false })
  imageUploadComponent!: ImageUploadComponent;

  categoryForm!: FormGroup;
  createForm = true;
  category?: Category;

  subscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      image: [''],
      parent: [''],
    });

    this.subscription = this.store
      .select(selectRouteNestedParams)
      .pipe(
        map(params => {
          const id = params['id'];

          if (id) {
            this.store
              .select(categorySelectors.getById(id))
              .subscribe(category => {
                this.category = category;
                this.createForm = false;
                this.categoryForm.patchValue(category);
                this.navigator.setPanelTitle('Update Category');
                this.store
                  .select(categorySelectors.getById(category.parent))
                  .subscribe(parent =>
                    this.categoryForm.get('parent')?.setValue(parent)
                  );
              });
          } else {
            this.navigator.setPanelTitle('Add Category');
          }
        })
      )
      .subscribe();

    this.subscription.add(this.addOrEditSuccessSubscription());
  }

  get parentCategory() {
    return this.categoryForm.get('parent') as FormControl;
  }

  get image() {
    return this.categoryForm.get('image') as FormControl;
  }

  get description() {
    return this.categoryForm.get('description') as FormControl;
  }

  get categoryHasImage() {
    return this.image.value;
  }

  onAddOrUpdateCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      const toSend = {
        name: category.name,
        description: category.description,
        parent: category.parent?.id,
        slug: slugify(category.name),
        created_by: 1,
        is_active: true,
      };

      const images: any =
        this.imageUploadComponent?.getFilesToUpload()?.length > 0
          ? this.imageUploadComponent?.getFilesToUpload()
          : undefined;

      if (this.createForm) {
        this.store.dispatch(
          categoryActions.addCategory({
            category: toSend,
            imageToUpload: images,
          })
        );
      } else {
        this.store.dispatch(
          categoryActions.editCategory({
            category: { ...toSend, id: this.category?.id },
            imageToUpload: images,
          })
        );
      }
    }
  }

  removeImage() {
    this.image.setValue(null);
  }

  goBack() {
    this.navigator.goBack();
    this.navigator.closeModal();
  }

  private addOrEditSuccessSubscription() {
    return this.actions$
      .pipe(
        ofType(
          categoryActions.addCategorySuccessful,
          categoryActions.editCategorySuccessful
        ),
        map(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
