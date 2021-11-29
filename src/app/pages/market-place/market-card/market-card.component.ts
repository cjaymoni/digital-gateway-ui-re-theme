import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProductAd } from 'src/app/models/product-ad.model';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent implements OnInit {
  @Input() productAd: ProductAd | null = null;

  constructor() {}

  ngOnInit() {}
}
