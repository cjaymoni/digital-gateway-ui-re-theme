import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductAd } from 'src/app/models/product-ad.model';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent implements OnInit {
  @Input() productAd: ProductAd | null = null;

  constructor(private navigator: NavigatorService) {}

  ngOnInit() {}

  get backgroundImage() {
    return `url(${this.productAd?.product.images?.[0]?.image})`;
  }

  openMarketAd() {
    this.navigator.marketAd.goToViewDetailsPage(this.productAd?.product.id);
  }
}
