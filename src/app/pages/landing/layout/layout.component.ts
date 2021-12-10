import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

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

  sliderContent = [];
  multimedia = [{},{},{}];

  productAds$ = this.store.select(productAdSelectors.all);
  articles$ = this.store.select(articleSelectors.all);
  forum$ = this.store.select(forumSelectors.getById(1));

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
