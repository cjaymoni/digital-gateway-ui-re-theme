import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';

@Component({
  selector: 'app-market-ads-settings',
  templateUrl: './market-ads-settings.component.html',
  styleUrls: ['./market-ads-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketAdsSettingsComponent implements OnInit {
  sourceProducts: Category[] = [];

  targetProducts: Category[] = [];

  categories$ = this.store.select(categorySelectors.all);

  constructor(private store: Store) {}
  ngOnInit() {}
}
