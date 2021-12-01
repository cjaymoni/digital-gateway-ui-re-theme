import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Pages, PublishedStatusMapping } from 'src/app/config/app-config';
import { Store } from '@ngrx/store';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ProductAd } from 'src/app/models/product-ad.model';

@Component({
  selector: 'app-my-market-posts',
  templateUrl: './my-market-posts.component.html',
  styleUrls: ['./my-market-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMarketPostsComponent implements OnInit, AfterViewInit {
  @ViewChild('descriptionColumnTemplate')
  descriptionTemplate!: TemplateRef<any>;

  myMarketAds$ = this.store.select(productAdSelectors.all);

  columns: any[] = [];

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'PRODUCT', field: 'product', subField: 'name' },
      {
        header: 'DESCRIPTION',
        field: 'product',
        subField: 'description',
        template: this.descriptionTemplate,
      },
      { header: 'PRICE', field: 'product', subField: 'price' },
    ];
  }

  ngOnInit() {}

  goToAddPostPage() {}

  viewMarketAd(productAd: ProductAd) {
    this.selectProductAd(productAd);
    this.navigator.openPanel(Pages.view, 'Preview Product Ad');
  }

  editMarketAd(productAd: ProductAd) {
    this.store.dispatch(
      productAdActions.selectProductAdToEdit({
        productAd,
      })
    );
    this.navigator.openPanel(
      [Pages.edit, productAd.product.id?.toString() || ''],
      'Edit Product'
    );
  }

  expireMarketAd(productAd: ProductAd) {}

  private selectProductAd(productAd: ProductAd) {
    this.store.dispatch(
      productAdActions.selectProductAd({
        productAd,
      })
    );
  }
}
