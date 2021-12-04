import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { ProductAd } from 'src/app/models/product-ad.model';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent implements OnInit {
  @Input() productAd: ProductAd | null = null;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
  ) {}

  ngOnInit() {}

  get backgroundImage() {
    return `url(${this.productAd?.product.images?.[0]?.image})`;
  }

  openMarketAd(){
    this.store.dispatch(
      productAdActions.selectProductAd({
        productAd: this.productAd as ProductAd,
      })
    );

    this.navigator.market.goToViewPage();
  }
}
