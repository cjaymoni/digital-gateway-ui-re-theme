import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  CategoryBlockEndpoint,
  EventBlockEndpoint,
  FeaturedArticlesBlockEndpoint,
  HighlightedArticlesBlockEndpoint,
} from '../config/routes';
import { Article } from '../models/article.model';
import { Category } from '../models/category.model';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class BlockService extends ResourceService {
  constructor(httpClient: HttpClient, private alert: AppAlertService) {
    super(httpClient, '');
  }

  saveHiglightedArticles(articles: Article[]) {
    const data = articles.map((article, index) => {
      return {
        article: article.id,
        is_pinned: true,
        display_order: index + 1,
      };
    });

    return this.http
      .put(HighlightedArticlesBlockEndpoint, data)
      .pipe(tap(_ => this.alert.showToast('Saved Successfully')));
  }

  saveFeaturedEvents(articles: Article[]) {
    const data = articles.map((article, index) => {
      return {
        article: article.id,
        is_pinned: true,
        display_order: index + 1,
      };
    });

    return this.http
      .put(EventBlockEndpoint, data)
      .pipe(tap(_ => this.alert.showToast('Saved Successfully')));
  }

  saveFeaturedCategories(categories: Category[]) {
    const data = categories.map((cat, index) => {
      return {
        category: cat.id,
        is_pinned: true,
        display_order: index + 1,
      };
    });

    return this.http
      .put(CategoryBlockEndpoint, data)
      .pipe(tap(_ => this.alert.showToast('Saved Successfully')));
  }

  saveFeaturedArticles(articles: Article[]) {
    const data = articles.map((article, index) => {
      return {
        article: article.id,
        is_pinned: true,
        display_order: index + 1,
      };
    });

    return this.http
      .put(FeaturedArticlesBlockEndpoint, data)
      .pipe(tap(_ => this.alert.showToast('Saved Successfully')));
  }
}
