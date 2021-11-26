import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';
import { articleEntityAdapter } from '../reducers/article.reducers';
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
}

export const articleSelectors = new ArticleSelectors();
