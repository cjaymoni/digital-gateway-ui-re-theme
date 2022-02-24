import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  multimedia$ = this.themeStore.featuredMultimedia$;

  productAds$ = this.store.select(productAdSelectors.all);
  highlights$ = this.themeStore.highlightArticlesArray$;
  featuredArticles$ = this.themeStore.featuredArticlesArray$;
  featuredOpportunities$ = this.themeStore.featuredEventsArray$;
  directLinks$ = this.themeStore.featuredDirectLinks$;

  // forum$ = this.store.select(forumSelectors.getById(1));
  forumMetrics$ = this.themeStore.forumMetrics$;

  featuredCategories$ = this.themeStore.featuredCategoryArray$;

  digiLinks!: any;

  constructor(
    private store: Store,
    private themeStore: ThemeSettingsStore,
    
  ) {}
  

  ngOnInit() {
  }

}
