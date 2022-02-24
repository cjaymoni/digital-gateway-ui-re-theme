import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  multimedia$ = this.themeStore.featuredMultimedia$;

  highlights$ = this.themeStore.highlightArticlesArray$;
  featuredArticles$ = this.themeStore.featuredArticlesArray$;
  featuredOpportunities$ = this.themeStore.featuredEventsArray$;
  directLinks$ = this.themeStore.featuredDirectLinks$;

  featuredCategories$ = this.themeStore.featuredCategoryArray$;

  constructor(
    private themeStore: ThemeSettingsStore
  ) {}
  
  ngOnInit() {
  }

}
