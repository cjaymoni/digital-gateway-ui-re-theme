import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';

class ArticleActions {
  readonly type = '[Article Actions]';

  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ articles: Article[] }>()
  );

  fetchError = createAction(`${this.type} Fetch Error`);

  selectArticle = createAction(
    `${this.type} Select Article`,
    props<{
      article: Article;
    }>()
  );

  selectArticleToEdit = createAction(
    `${this.type} Select Article To Edit`,
    props<{
      article: Article;
    }>()
  );

  selectArticleSuccess = createAction(`${this.type} Select Article Success`);

  searchArticle = createAction(
    `${this.type} Search Article`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectArticle = createAction(
    `${this.type} Find And Select Article`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  searchArticleSuccess = createAction(`${this.type} Search Article Success`);

  addArticle = createAction(
    `${this.type} Add Article`,
    props<{ article: Article; imageToUpload?: File }>()
  );

  addArticleSuccessful = createAction(
    `${this.type} Add Article Successful`,
    props<{ article: Article }>()
  );

  editArticle = createAction(
    `${this.type} Edit Article`,
    props<{ article: Article }>()
  );

  editArticleSuccessful = createAction(
    `${this.type} Edit Article Successful`,
    props<{ updatedArticle: Update<Article> }>()
  );

  deleteArticle = createAction(
    `${this.type} Delete Article`,
    props<{ id: number }>()
  );

  deleteArticleSuccessful = createAction(
    `${this.type} Delete Article Successful`,
    props<{ id: number }>()
  );
}

export const articleActions = new ArticleActions();
