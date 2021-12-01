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
import { Store } from '@ngrx/store';
import { filter, Subscription, take, tap } from 'rxjs';
import { TagType } from 'src/app/config/app-config';
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

  adTagType = TagType.ad;

  adTypes = [
    {
      name: 'Bid',
      value: 'bid',
    },
    {
      name: 'Offer',
      value: 'offer',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private store: Store
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
        name: ['', [Validators.required]],
        description: ['', Validators.required],
        price: ['', [Validators.required]],
        brand: [''],
        tags: [],
        images: [],
        product_type: [''],
      }),
    });

    this.subscription = this.getProductAdToEditSubscription();
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
      productAdFromForm.ad_type = this.productAdForm.value.ad_type.value;

      if (this.createForm) {
        this.store.dispatch(
          productAdActions.addProductAd({
            productAd: { ...productAdFromForm, author: 1 },
            imagesToUpload: (
              this.imageUploadComponent?.getFilesToUpload() || []
            ).concat(this.images.value || []),
          })
        );
      } else {
        this.store.dispatch(
          productAdActions.editProductAd({
            productAd: { ...productAdFromForm, author: 1 },
            imagesToUpload: (
              this.imageUploadComponent?.getFilesToUpload() || []
            ).concat(this.images.value || []),
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
          this.productAdForm.patchValue(productAd);
          this.productAd = productAd;
          this.createForm = false;
          this.navigator.setPanelTitle('Edit Product');
        })
      )
      .subscribe();
  }
}
