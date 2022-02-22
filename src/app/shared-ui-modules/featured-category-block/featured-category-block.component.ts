import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-featured-category-block',
  templateUrl: './featured-category-block.component.html',
  styleUrls: ['./featured-category-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategoryBlockComponent implements OnInit {
  featuredCategories$ = this.themeStore.featuredCatgories$;

  constructor(private themeStore: ThemeSettingsStore) {}

  ngOnInit(): void {}
}
