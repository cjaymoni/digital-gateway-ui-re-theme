import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ArticlesEndpoint } from 'src/app/config/routes';
import { Article } from 'src/app/models/article.model';
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
}
