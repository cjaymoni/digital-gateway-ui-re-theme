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
  searchResults: Article[];
  myArticles: Article[];
  searchPage: number;
  searchCount: number;
  page: number;
  count: number;
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
  searchPage: 1,
  page: 1,
  searchResults: [],
  myArticles: [],
  count: 0,
  searchCount: 0,
});

export const articleReducer = createReducer(
  initialState,
  on(articleActions.fetch, state => {
    return { ...state, loading: true };
  }),
  on(articleActions.fetchSuccessfulAdd, (state, { articles }) => {
    return articleEntityAdapter.setAll(articles, { ...state, loading: false });
  }),
  on(articleActions.fetchSuccessful, (state, { articles }) => {
    return articleEntityAdapter.addMany(articles, { ...state, loading: false });
  }),
  on(articleActions.fetchSearchSuccessful, (state, { articles }) => {
    return { ...state, loading: false, searchResults: articles };
  }),
  on(articleActions.fetchMyArticlesSuccessful, (state, { articles }) => {
    return { ...state, loading: false, myArticles: articles };
  }),
  on(articleActions.searchArticle, state => {
    return { ...state, loading: true };
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
    const stateCopy = { ...state };
    const index = stateCopy.myArticles.findIndex(
      a => a.id === updatedArticle.id
    );
    const myArticlesCopy = [...stateCopy.myArticles];
    myArticlesCopy.splice(index, 1, updatedArticle.changes as any);
    const edited = { ...stateCopy, myArticles: myArticlesCopy };
    return articleEntityAdapter.updateOne(updatedArticle, edited);
  }),
  on(articleActions.deleteArticleSuccessful, (state, { id }) => {
    return articleEntityAdapter.removeOne(id, state);
  }),
  on(articleActions.changePage, (state, { page }) => {
    return { ...state, page };
  }),
  on(articleActions.changeSearchPage, (state, { searchPage }) => {
    return { ...state, searchPage };
  }),
  on(articleActions.setCount, (state, { count }) => {
    return { ...state, count };
  }),
  on(articleActions.setSearchCount, (state, { count }) => {
    return { ...state, searchCount: count };
  }),
  on(articleActions.clearAllSelected, state => {
    return { ...state, selectedArticleToEdit: null, selectedArticle: null };
  })
);
