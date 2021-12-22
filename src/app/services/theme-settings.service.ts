import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defaultIfEmpty, forkJoin, map, of, tap } from 'rxjs';
import {
  EventsEndpoint,
  FeaturedCategoriesEndpoint,
  ForumEndpoint,
  HighlightArticlesEndpoint,
} from '../config/routes';
import { initialHomepageState } from '../store/theme-settings.state';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeSettingsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, '');
  }

  getHompageData() {
    return forkJoin([
      this.getHighlightArticles(),
      this.getFeaturedCategories(),
      this.getEvents(),
      this.getForumMetrics(),
    ]).pipe(
      map(data => {
        return {
          highlightArticles: data[0],
          featuredCategories: data[1],
          events: data[2],
          forumMetrics: data[3],
        };
      }),
      catchError(e => of(initialHomepageState))
    );
  }

  getFeaturedCategories() {
    return this.getResources(FeaturedCategoriesEndpoint).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getEvents() {
    return this.getResources(EventsEndpoint).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getHighlightArticles() {
    return this.getResources(HighlightArticlesEndpoint).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getForumMetrics() {
    return this.getResources(ForumEndpoint + 'metrics').pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }
}
