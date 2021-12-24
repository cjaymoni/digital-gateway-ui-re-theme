import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
