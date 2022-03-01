import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { SeoService } from 'src/app/helpers/seo.service';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';

@Component({
  selector: 'app-market-list-details',
  templateUrl: './market-list-details.component.html',
  styleUrls: ['./market-list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListDetailsComponent implements OnInit {
  @Input() product$ = this.store
    .select(productAdSelectors.selectedProductAd)
    .pipe(
      filter(ad => !!ad),
      tap((ad: any) => {
        this.seo.generateTags({
          title: ` ${ad.ad_type.toUpperCase()} | ${ad.product.name}`,
          image: ad.product.images?.[0]?.image,
          description: ad.product.description,
        });
      })
    );
  loading$ = this.store.select(productAdSelectors.loading);

  productImages!: any[];

  displayImage = false;
  activeIndex = 0;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private store: Store, private seo: SeoService) {}

  ngOnInit() {}

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayImage = true;
  }
}
