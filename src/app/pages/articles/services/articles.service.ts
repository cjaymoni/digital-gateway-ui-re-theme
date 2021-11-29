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

  addArticle(article: Article, imageToUpload?: File) {
    const formData = this.getFormDataFromArticleObject(article, imageToUpload);
    return this.storeResource(formData).pipe(map(data => data as Article));
  }

  editArticle(article: Article, imageToUpload?: File) {
    const formData = this.getFormDataFromArticleObject(article, imageToUpload);

    return this.updateResourcePut(formData, article.id).pipe(
      map(data => data as Article)
    );
  }

  private getFormDataFromArticleObject(
    article: Article,
    imageToUpload?: File | AppUploadedImage[] | any
  ) {
    const formData = new FormData();
    if (imageToUpload) {
      if (Array.isArray(imageToUpload)) {
        // array means image didnt change so use same value
        formData.append('images[0]image', imageToUpload[0].image);
        formData.append('images[0]title', imageToUpload[0].title);
      } else {
        formData.append('images[0]image', imageToUpload, imageToUpload.name);
        formData.append('images[0]title', imageToUpload.name);
      }
    } else {
      formData.append('images', '');
    }
    for (const key in article) {
      const data = (article as any)[key];

      if (Array.isArray(data)) {
        if (data.length > 0) {
          data.forEach(v => formData.append(key, v));
        }
      } else {
        formData.append(key, data);
      }
    }

    return formData;
  }
}
