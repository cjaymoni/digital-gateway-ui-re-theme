import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  articles$ = this.store.select(articleSelectors.all);
  loadingArticles$ = this.store.select(articleSelectors.loading);
  selectedArticle$ = this.store.select(articleSelectors.selectedArticle);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
