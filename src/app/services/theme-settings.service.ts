import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  defaultIfEmpty,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  EventsEndpoint,
  FeaturedArticlesEndpoint,
  FeaturedCategoriesEndpoint,
  ForumEndpoint,
  HighlightArticlesEndpoint,
  MultiMediaEndpoint,
} from '../config/routes';
import { Category } from '../models/category.model';
import { DigitalLinkService } from '../pages/digital-links/services/digital-link.service';
import { categorySelectors } from '../store/selectors/category.selectors';
import {
  initialHomepageState,
  ThemeSettings,
} from '../store/theme-settings.state';
import { CategoryService } from './category.service';
import { ResourceService } from './resources.service';
import { TransferStateService } from './transfer-state.service';

const HOMEPAGE_DATA_KEY = 'initialData';

@Injectable({
  providedIn: 'root',
})
export class ThemeSettingsService extends ResourceService {
  loadingHomepageData$ = new BehaviorSubject(false);

  constructor(
    http: HttpClient,
    private directLinkService: DigitalLinkService,
    transferState: TransferStateService,
    private store: Store,
    private catService: CategoryService
  ) {
    super(http, 'themeData', transferState);
  }

  getHompageData() {
    const homeDataRequest = forkJoin([
      this.getHighlightArticles(),
      this.getFeaturedCategories(),
      this.getEvents(),
      this.getForumMetrics(),
      this.getFeaturedArticles(),
      this.getMultimedia(),
      this.getDirectLinks(),
    ]).pipe(
      map(data => {
        return {
          highlightArticles: data[0],
          featuredCategories: data[1],
          featuredEvents: data[2],
          forumMetrics: data[3],
          featuredArticles: data[4],
          multimedia: data[5],
          featuredDirectLinks: data[6],
        };
      }),
      catchError(e => of(initialHomepageState)),
      tap(_ => this.loadingHomepageData$.next(false))
    );

    return this.transferState.fetch(
      HOMEPAGE_DATA_KEY,
      homeDataRequest,
      initialHomepageState as any
    );
  }

  getFeaturedCategories() {
    return this.getResources(
      FeaturedCategoriesEndpoint,
      undefined,
      undefined,
      false,
      'featuredCategories'
    ).pipe(
      defaultIfEmpty([]),
      catchError(e => of([])),
      switchMap((fCat: any[]) => {
        const _fc = [...fCat];
        const _fCatSorted = _fc.sort(
          (a, b) => a.display_order - b.display_order
        );
        return this.catService
          .getResources(undefined, undefined, undefined, false, 'allCategories')
          .pipe(
            map((allCat: Category[]) => {
              const _sorted = _fCatSorted.map(sc => {
                const _sc = { ...sc };
                _sc.category = allCat.find(c => c.id === _sc.category);
                return _sc;
              });
              return _sorted;
            })
          );
      })
    );
  }

  getEvents() {
    return this.getResources(
      EventsEndpoint,
      undefined,
      undefined,
      false,
      'featuredCurrentOpportunities'
    ).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getHighlightArticles() {
    return this.getResources(
      HighlightArticlesEndpoint,
      undefined,
      undefined,
      false,
      'featuredHighlights'
    ).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getForumMetrics() {
    return of([]);
    return this.http.get(ForumEndpoint + 'metrics').pipe(
      map(data => data as any),
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getMultimedia() {
    return this.getResources(
      MultiMediaEndpoint + '?featured=True',
      undefined,
      undefined,
      false,
      'featuredMultimedia'
    ).pipe(
      // map((data: any) => data.results as any),
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getFeaturedArticles() {
    return this.getResources(
      FeaturedArticlesEndpoint,
      undefined,
      undefined,
      false,
      'featuredArticles'
    ).pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }

  getDirectLinks() {
    return this.directLinkService.getFeaturedLinks().pipe(
      defaultIfEmpty([]),
      catchError(e => of([]))
    );
  }
}
