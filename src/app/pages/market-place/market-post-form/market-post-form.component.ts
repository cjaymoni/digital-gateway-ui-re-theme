import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
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
export class MarketPostFormComponent implements OnInit {
  @ViewChild('imageUpload', { static: true })
  imageUploadComponent: ImageUploadComponent | null = null;

  createForm = true;
  productAdForm!: FormGroup;

  // selectedProductAd$ =
  subscription!: Subscription;

  productAd!: ProductAd;

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private store: Store
  ) {}

  ngOnInit() {
    this.productAdForm = this.fb.group({
      gh_post: [],
      location: [],
      cellphone: [],
      district: [],
      email: [],
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

  removeImage() {
    this.images.setValue([]);
  }

  onAddOrUpdateMarketPost() {
    if (this.productAdForm.valid) {
      const productAdFromForm = this.productAdForm.value;
      productAdFromForm.product.tags = this.tags.value?.map((t: any) => t.id);
      productAdFromForm.product.product_type = this.productType.value?.id;

      this.store.dispatch(
        productAdActions.addProductAd({
          productAd: { ...productAdFromForm, author: 1 },
          imagesToUpload: (
            this.imageUploadComponent?.getFilesToUpload() || []
          ).concat(this.images.value || []),
        })
      );
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
        })
      )
      .subscribe();
  }
}
