import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ArticlesEndpoint } from 'src/app/config/routes';
import { Article, AppUploadedImage } from 'src/app/models/article.model';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ArticlesEndpoint);
  }

  searchArticle(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as Article[])
    );
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

    return this.updateResourcePut(formData, article.id).pipe(
      map(data => data as Article)
    );
  }

  editArticleStatus(formData: any, articleId: any) {
    return this.updateResource(articleId, formData).pipe(
      map(data => data as Article)
    );
  }
  private getFormDataFromArticleObject(
    article: Article,
    imageToUpload?: File | AppUploadedImage[] | any
  ) {
    const dataToStore = this.getFormDataFromObject(article, imageToUpload);

    return dataToStore;
  }
}
