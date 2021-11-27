import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { articleActions } from '../actions/article.actions';

export interface ArticleState extends EntityState<Article> {
  // additional entity state properties
  selectedArticle: Article | null;
  searchQuery: '';
  loading: boolean;
  selectedArticleToEdit: Article | null;
}

export const articleEntityAdapter: EntityAdapter<Article> =
  createEntityAdapter<Article>({
    sortComparer: false,
  });

export const initialState: ArticleState = articleEntityAdapter.getInitialState({
  selectedArticle: null,
  searchQuery: '',
  loading: false,
  selectedArticleToEdit: null,
});

export const articleReducer = createReducer(
  initialState,
  on(articleActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(articleActions.fetchSuccessful, (state, { articles }) => {
    return articleEntityAdapter.setAll(articles, { ...state, loading: false });
  }),
  on(articleActions.fetchError, state => {
    return { ...state, loading: false };
  }),
  on(articleActions.selectArticle, (state, { article }) => {
    return { ...state, selectedArticle: article };
  }),
  on(articleActions.selectArticleToEdit, (state, { article }) => {
    return { ...state, selectedArticleToEdit: article };
  }),
  on(articleActions.addArticleSuccessful, (state, { article }) => {
    return articleEntityAdapter.addOne(article, state);
  }),
  on(articleActions.editArticleSuccessful, (state, { updatedArticle }) => {
    return articleEntityAdapter.updateOne(updatedArticle, state);
  }),
  on(articleActions.deleteArticleSuccessful, (state, { id }) => {
    return articleEntityAdapter.removeOne(id, state);
  }),
  on(articleActions.clearAllSelected, state => {
    return { ...state, selectedArticleToEdit: null, selectedArticle: null };
  })
);
