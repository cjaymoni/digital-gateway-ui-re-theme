import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import {
  articleEntityAdapter,
  ArticleState,
} from '../reducers/article.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

const articleFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.Article
);

class ArticleSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(articleEntityAdapter, articleFeatureSelector);
  }

  alll = createSelector(this.state, state => state);
  filtered = createSelector(this.state, state => state);
  selectedArticle = createSelector(this.state, state => state.selectedArticle);
  selectedArticleToEdit = createSelector(
    this.state,
    state => state.selectedArticleToEdit
  );

  searchResults = createSelector(
    this.state,
    (state: ArticleState) => state.searchResults
  );

  myArticles = createSelector(
    this.state,
    (state: ArticleState) => state.myArticles
  );

  count = createSelector(this.state, (state: ArticleState) => state.count);

  searchCount = createSelector(
    this.state,
    (state: ArticleState) => state.searchCount
  );
}

export const articleSelectors = new ArticleSelectors();
