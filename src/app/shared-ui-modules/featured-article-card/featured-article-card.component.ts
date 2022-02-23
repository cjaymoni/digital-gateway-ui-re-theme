import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-featured-article-card',
  templateUrl: './featured-article-card.component.html',
  styleUrls: ['./featured-article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedArticleCardComponent implements OnInit {
  @Input() featuredArticle: Article | null = null;

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit() {}
  readArticle(slug: string) {
    this.navigator.article.goToViewDetailsPage(slug);
  }
}
