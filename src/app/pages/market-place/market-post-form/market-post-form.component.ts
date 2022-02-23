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
import { filter, Subscription, take, tap } from 'rxjs';
import { TagType } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { AppUploadedImage } from 'src/app/models/article.model';
import { ProductAd } from 'src/app/models/product-ad.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ImageUploadComponent } from 'src/app/shared-ui-modules/image-upload/image-upload.component';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';

@Component({
  selector: 'app-market-post-form',
  templateUrl: './market-post-form.component.html',
  styleUrls: ['./market-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketPostFormComponent implements OnInit, OnDestroy {
  @ViewChild('imageUpload', { static: true })
  imageUploadComponent: ImageUploadComponent | null = null;

  createForm = true;
  productAdForm!: FormGroup;

  // selectedProductAd$ =
  subscription!: Subscription;

  productAd!: ProductAd;

  adTagType = TagType.product;

  adTypes = [
    {
      name: 'bid',
      value: 'bid',
    },
    {
      name: 'offer',
      value: 'offer',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private store: Store,
    private action$: Actions
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.productAdForm = this.fb.group({
      gh_post: [],
      location: [],
      cellphone: [],
      district: [],
      email: [],
      expires: [],
      ad_type: [this.adTypes[0], [Validators.required]],
      product: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(160)]],
        description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(160)]],
        price: ['', [Validators.required]],
        brand: [''],
        tags: [],
        images: [],
        product_type: [''],
      }),
    });

    this.subscription = this.getProductAdToEditSubscription();
    this.subscription.add(this.addOrEditSubscription());
  }
  get tags() {
    return this.productAdForm.get('product.tags') as FormControl;
  }

  get images() {
    return this.productAdForm.get('product.images') as FormControl;
  }

  get postHasImage() {
    return this.images.value?.[0]?.image;
  }

  get productType() {
    return this.productAdForm.get('product.product_type') as FormControl;
  }

  get district() {
    return this.productAdForm.get('district') as FormControl;
  }

  removeImage(index: number) {
    const images = [...this.images.value] as AppUploadedImage[];
    images.splice(index, 1);
    this.images.setValue(images);
  }

  onAddOrUpdateMarketPost() {
    if (this.productAdForm.valid) {
      const productAdFromForm = { ...this.productAdForm.value };
      productAdFromForm.product.tags = this.tags.value?.map((t: any) => t.id);
      productAdFromForm.product.product_type = this.productType.value?.id;
      productAdFromForm.product.id = this.productAd?.product?.id;
      productAdFromForm.product.slug = slugify(
        productAdFromForm.product.name + productAdFromForm.product.description
      );
      productAdFromForm.slug = slugify(
        productAdFromForm.cellphone + productAdFromForm.gh_post
      );
      productAdFromForm.ad_type = this.productAdForm.value.ad_type.value;
      const images = (
        this.imageUploadComponent?.getFilesToUpload() || []
      ).concat(this.images.value || []);
      productAdFromForm.district = this.district.value?.id;

      if (this.createForm) {
        this.store.dispatch(
          productAdActions.addProductAd({
            productAd: { ...productAdFromForm, author: 1, is_active: true },
            imagesToUpload: images,
          })
        );
      } else {
        this.store.dispatch(
          productAdActions.editProductAd({
            productAd: { ...productAdFromForm, author: 1, is_active: true },
            imagesToUpload: images,
          })
        );
      }
    }
  }

  goBack() {
    this.navigator.goBack();
  }

  private getProductAdToEditSubscription() {
    return this.store
      .select(productAdSelectors.selectedProductAd)
      .pipe(
        filter(data => !!data),
        tap((productAd: ProductAd) => {
          this.productAdForm.patchValue({
            ...productAd,
            ad_type: { name: productAd.ad_type, value: productAd.ad_type },
          });
          this.productAdForm
            .get('product.product_type')
            ?.patchValue(productAd.product.product_type?.[0]);

          this.productAd = productAd;
          this.createForm = false;
          this.navigator.setPanelTitle('Update Product');
        })
      )
      .subscribe();
  }

  private addOrEditSubscription() {
    return this.action$
      .pipe(
        ofType(
          productAdActions.editProductAdSuccessful,
          productAdActions.addProductAdSuccessful
        ),
        tap(_ => {
          this.navigator.closeModal();
        })
      )
      .subscribe();
  }
}
