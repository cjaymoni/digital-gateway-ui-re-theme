import {
  articleEntityAdapter,
  ArticleState,
} from '../reducers/article.reducers';
import { DefaultAdapterSelectors } from './default.adapter.selectors';

class ArticleSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(articleEntityAdapter);
  }
}

export const articleSelectors = new ArticleSelectors();
