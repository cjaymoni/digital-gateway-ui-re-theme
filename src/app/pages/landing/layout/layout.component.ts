import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '2000px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  multimedia = ['PUUpJMdvKKw', '1ASNZ_Xs2gU', 'sOyemzzJQtQ'];

  productAds$ = this.store.select(productAdSelectors.all);
  articles$ = this.store.select(articleSelectors.all);
  forum$ = this.store.select(forumSelectors.getById(1));

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit() {}

  goToArticle(article: Article) {
    this.navigator.article.goToViewDetailsPage(article.slug);
  }
}
