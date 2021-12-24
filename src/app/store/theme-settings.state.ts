import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, Observable, retry, tap } from 'rxjs';
import { AppUploadedImage } from '../models/article.model';
import { Category } from '../models/category.model';
import { ThemeSettingsService } from '../services/theme-settings.service';
import { categorySelectors } from './selectors/category.selectors';

export interface ThemeSettings {
  highlightArticles: {
    article: {
      slug: string;
      title: string;
      id: number;
      images: AppUploadedImage[];
    };
    block: {
      name: string;
      logo: string;
    };
    is_pinned: boolean;
    display_order: number;
  }[];

  featuredEvents: {
    article: {
      slug: string;
      title: string;
      id: number;
      images: AppUploadedImage[];
    };
    block: {
      name: string;
      logo: string;
    };
    is_pinned: boolean;
    display_order: number;
  }[];

  featuredArticles: {
    article: {
      slug: string;
      title: string;
      id: number;
      images: AppUploadedImage[];
    };
    block: {
      name: string;
      logo: string;
    };
    is_pinned: boolean;
    display_order: number;
  }[];

  featuredCategories: {
    category: number | any;
    block: number;
    is_pinned: false;
    display_order: number;
  }[];

  forumMetrics: any[];
}

export const initialHomepageState: ThemeSettings = {
  highlightArticles: [],
  featuredCategories: [],
  forumMetrics: [],
  featuredArticles: [],
  featuredEvents: [],
};

@Injectable()
export class ThemeSettingsStore extends ComponentStore<ThemeSettings> {
  constructor(
    private themeSettings: ThemeSettingsService,
    private store: Store
  ) {
    super(initialHomepageState);
    this.getHomepageData();
  }

  categories$ = this.store.select(categorySelectors.all);

  readonly featuredCatgories$: Observable<ThemeSettings['featuredCategories']> =
    this.select(state => state.featuredCategories);

  readonly highlightArticles$: Observable<ThemeSettings['highlightArticles']> =
    this.select(state => state.highlightArticles);

  readonly featuredArticles$: Observable<ThemeSettings['highlightArticles']> =
    this.select(state => state.highlightArticles);

  readonly featuredEvents$: Observable<ThemeSettings['highlightArticles']> =
    this.select(state => state.featuredEvents);

  readonly highlightArticlesArray$ = this.select(
    this.highlightArticles$.pipe(map(d => d as any[])),
    highlights => {
      const _ha = [...highlights];
      return _ha.sort((a, b) => a.display_order - b.display_order);
    }
  );

  readonly featuredEventsArray$ = this.select(
    this.featuredEvents$.pipe(map(d => d as any[])),
    highlights => {
      const _ha = [...highlights];
      return _ha.sort((a, b) => a.display_order - b.display_order);
    }
  );

  readonly featuredCategoryArray$ = this.select(
    this.categories$.pipe(map(cat => cat as Category[])),
    this.featuredCatgories$.pipe(
      map(fc => {
        const _fc = [...fc];
        return _fc.sort((a, b) => a.display_order - b.display_order);
      })
    ),
    (cats, sortedFeatured) => {
      const _sorted = sortedFeatured.map(sc => {
        const _sc = { ...sc };
        _sc.category = cats.find(c => c.id === _sc.category);
        return _sc;
      });

      return _sorted;
    }
  );

  readonly getHomepageData = this.effect(() => {
    return this.themeSettings.getHompageData().pipe(
      retry(3),
      tap(d => console.log(d)),
      tap({
        next: homepageData => this.setState(homepageData),
        error: () => {
          this.setState(initialHomepageState);
        },
      }),
      catchError(() => EMPTY)
    );
  });
}
