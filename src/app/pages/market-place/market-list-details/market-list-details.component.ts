import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { productTypeActions } from 'src/app/store/actions/product-type.actions';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';

@Component({
  selector: 'app-market-list-details',
  templateUrl: './market-list-details.component.html',
  styleUrls: ['./market-list-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListDetailsComponent implements OnInit {
  @Input() product$ = this.store.select(productAdSelectors.selectedProductAd);

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private store: Store) {}

  ngOnInit() {}
}
