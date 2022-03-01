import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-featured-categories-card',
  templateUrl: './featured-categories-card.component.html',
  styleUrls: ['./featured-categories-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategoriesCardComponent implements OnInit {
  @Input() category: Category | null = null;

  constructor(
    private navigator: NavigatorService,
    private gtag: GoogleAnalyticsService
  ) {}

  ngOnInit() {}

  gotoCategoryPage(category: Category) {
    this.gtag.Events.openedFeaturedCategory(category.id);
    this.navigator.article.goTo(['articles', 'search', category?.slug]);
  }
}
