import { createFeatureSelector } from '@ngrx/store';
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
}

export const articleSelectors = new ArticleSelectors();
