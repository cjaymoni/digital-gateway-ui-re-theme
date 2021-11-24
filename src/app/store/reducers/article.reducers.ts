import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { articleActions } from '../actions/article.actions';

export interface ArticleState extends EntityState<Article> {
  // additional entity state properties
  selectedArticle: string | null;
}

export const articleEntityAdapter: EntityAdapter<Article> =
  createEntityAdapter<Article>({
    sortComparer: false,
  });

export const initialState: ArticleState = articleEntityAdapter.getInitialState({
  selectedArticle: null,
});

export const articleReducer = createReducer(
  initialState,
  on(articleActions.fetchSuccessful, (state, { articles }) => {
    return articleEntityAdapter.setAll(articles, state);
  }),
  on(articleActions.addArticleSuccessful, (state, { article }) => {
    return articleEntityAdapter.addOne(article, state);
  }),
  on(articleActions.editArticleSuccessful, (state, { updatedArticle }) => {
    return articleEntityAdapter.updateOne(updatedArticle, state);
  }),
  on(articleActions.deleteArticleSuccessful, (state, { id }) => {
    return articleEntityAdapter.removeOne(id, state);
  })
);
