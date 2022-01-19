import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defaultIfEmpty, forkJoin, map, of, tap } from 'rxjs';
import {
  EventsEndpoint,
  FeaturedCategoriesEndpoint,
  ForumEndpoint,
  HighlightArticlesEndpoint,
  MultiMediaEndpoint,
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
      this.getMultimedia(),
    ]).pipe(
      map(data => {
        return {
          highlightArticles: data[0],
          featuredCategories: data[1],
          events: data[2],
          forumMetrics: data[3],
          featuredEvents: data[2],
          featuredArticles: [],
          multimedia: data[4],
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
    return this.http.get(ForumEndpoint + 'metrics').pipe(
      map(data => data as any),
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getMultimedia() {
    return this.http.get(MultiMediaEndpoint + '?featured=True').pipe(
      map((data: any) => data.results as any),
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }
}
