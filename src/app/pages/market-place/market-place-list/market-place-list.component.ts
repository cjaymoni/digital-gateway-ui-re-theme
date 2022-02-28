import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concat, filter, merge, race, tap } from 'rxjs';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';

@Component({
  selector: 'app-market-place-list',
  templateUrl: './market-place-list.component.html',
  styleUrls: ['./market-place-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketPlaceListComponent implements OnInit {
  productAds$ = this.store.select(productAdSelectors.all);

  productAdsLoading$ = this.store.select(productAdSelectors.loading);
  showFilter = true;

  productFilterForm!: FormGroup;
  productType = new FormControl();
  priceRange = new FormControl([1, 500]);
  district = new FormControl();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productFilterForm = this.fb.group({
      productType: [],
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  filterProducts() {
    const filters: any = {};
    if (this.district.value) {
      filters.district = this.district.value.id;
    }
    if (this.productType.value) {
      filters.product_type = this.productType.value.id;
    }
    filters.start_price = this.priceRange.value[0];
    filters.end_price = this.priceRange.value[1];

    this.store.dispatch(
      productAdActions.searchProductAd({
        searchParams: {
          ...filters,
        },
      })
    );

    this.productAds$ = this.store.select(productAdSelectors.searchResults);
  }

  resetFilter() {
    this.showFilter = false;
    this.productFilterForm.reset();
    this.store.dispatch(productAdActions.fetchMyProductAds());
    this.productAds$ = this.store.select(productAdSelectors.all);
  }
}
