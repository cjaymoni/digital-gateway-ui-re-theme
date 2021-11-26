import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Pages } from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-my-articles-list',
  templateUrl: './my-articles-list.component.html',
  styleUrls: ['./my-articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyArticlesListComponent implements OnInit {
  myArticles$ = this.store.select(articleSelectors.all);

  columns = [
    { header: 'TITLE', field: 'title' },
    { header: 'CATEGORY', field: 'category' },
    { header: 'TAGS', field: 'tags' },
    { header: 'STATUS', field: 'status' },
    { header: 'CREATED_BY', field: 'created_by' },
  ];

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('My Articles');
  }

  viewArticle(article: Article) {
    this.selectArticle(article);
    this.navigator.openPanel(Pages.view);
  }

  editArticle(article: Article) {
    this.selectArticle(article);
    this.navigator.openPanel(Pages.edit);
  }

  goToAddArticlePage() {
    this.navigator.article.goToAddPage();
  }

  private selectArticle(article: Article) {
    this.store.dispatch(
      articleActions.selectArticle({
        article,
      })
    );
  }
}
