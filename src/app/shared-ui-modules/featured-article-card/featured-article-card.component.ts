import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-featured-article-card',
  templateUrl: './featured-article-card.component.html',
  styleUrls: ['./featured-article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedArticleCardComponent implements OnInit {
  @Input() featuredArticle: any = null;

  constructor(
    private navigator: NavigatorService,
    private gtag: GoogleAnalyticsService
  ) {}

  ngOnInit() {}
  readArticle(article: Article) {
    this.gtag.Events.openedFeaturedArticle(article.id);
    this.navigator.article.goToViewDetailsPage(article.slug);
  }
}
