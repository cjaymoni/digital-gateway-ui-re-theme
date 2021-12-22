import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from 'src/app/config/app-config';
import { ArticlesEndpoint, CategoryEndpoint } from 'src/app/config/routes';
import { Article, AppUploadedImage } from 'src/app/models/article.model';
import { ResourceService } from 'src/app/services/resources.service';
import { articleActions } from 'src/app/store/actions/article.actions';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends ResourceService {
  constructor(http: HttpClient, private store: Store) {
    super(http, ArticlesEndpoint);
  }

  override getOneResource(id: any) {
    return this.http
      .get(`${this.endpoint}${id}/?moderate=True`)
      .pipe(map(data => data as Article));
  }

  searchArticle(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(
      this.endpoint + '?moderate=True&page_size=1',
      undefined,
      searchParams
    ).pipe(map(data => data as Article[]));
  }

  searchArticleByCategory(categoryId: number) {
    return this.http
      .get(`${CategoryEndpoint}${categoryId}/articles`)
      .pipe(map((data: any) => data.results as Article[]));
  }

  findArticleUsingSlug(slug: string) {
    return this.searchArticle({ slug });
  }

  addArticle(article: Article, imageToUpload?: File[]) {
    const formData = this.getFormDataFromArticleObject(article, imageToUpload);
    return this.storeResource(formData).pipe(map(data => data as Article));
  }

  editArticle(article: Article, imageToUpload?: File[] | any[]) {
    const formData = this.getFormDataFromArticleObject(article, imageToUpload);

    return this.http
      .put(`${this.endpoint}${article.id}/?moderate=True`, formData)
      .pipe(map(data => data as Article));
  }

  editArticleStatus(formData: any, articleId: any) {
    return this.updateResource(
      articleId,
      formData,
      `${this.endpoint}${articleId}/?moderate=True`,
      true
    ).pipe(
      map(data => data as Article),
      tap(article =>
        this.store.dispatch(
          articleActions.editArticleSuccessful({
            updatedArticle: { id: article.id, changes: article },
          })
        )
      )
    );
  }

  getArticlesToModerate(page = 1, page_size = DEFAULT_PAGE_SIZE) {
    return this.getResources(`${this.endpoint}?moderate=True`, {
      page,
      page_size,
    }).pipe(map(data => data as Article[]));
  }
  private getFormDataFromArticleObject(
    article: Article,
    imageToUpload?: File | AppUploadedImage[] | any
  ) {
    const dataToStore = this.getFormDataFromObject(article, imageToUpload);

    return dataToStore;
  }
}
