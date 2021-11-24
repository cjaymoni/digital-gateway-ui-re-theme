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

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit(): void {}

  openArticle() {
    this.store.dispatch(
      articleActions.selectArticle({
        article: this.article as Article,
      })
    );

    this.navigator.article.goToReadArticlePage(this.article?.slug as string);
  }
}
