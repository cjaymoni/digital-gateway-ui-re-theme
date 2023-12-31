import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article | null = null;
  @Input() cardClass = 'md:h-15rem';

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit(): void {}

  openArticle() {
    this.navigator.article.goToViewDetailsPage(this.article?.slug as string);
  }
}
