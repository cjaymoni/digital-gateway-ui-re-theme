import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { ProductAd } from 'src/app/models/product-ad.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { productAdActions } from 'src/app/store/actions/product-ad.actions';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';

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
    this.navigator.marketAd.goToViewPage(
      productAd.product.id,
      'Preview Product Ad'
    );
  }

  editMarketAd(productAd: ProductAd) {
    this.store.dispatch(
      productAdActions.selectProductAdToEdit({
        productAd,
      })
    );
    this.navigator.marketAd.goToEditPage(
      productAd.product.id,
      'Edit Product',
      RouterOutlets.Modal
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
