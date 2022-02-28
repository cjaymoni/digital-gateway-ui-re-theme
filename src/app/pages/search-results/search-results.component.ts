import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, switchMap, take } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { selectRouteParam } from 'src/app/store/selectors/router.selectors';
import { SearchService } from './services/search.service';
import { SearchList } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { SeoService } from 'src/app/helpers/seo.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  query$ = this.store.select(selectRouteParam('query'));
  selectedForum$ = this.store.select(forumSelectors.selectedForum);

  searching$ = new BehaviorSubject(true);
  searchResults$ = new BehaviorSubject(new Array(0));

  articleSearchResults$ = this.searchResults$.pipe(
    map((value: any[]) => {
      const filtered = value.filter(val => val.source == SearchList.ARTICLE);
      return filtered;
    })
  );

  adsSearchResults$ = this.searchResults$.pipe(
    map((value: any[]) => {
      const filtered = value.filter(val => val.source == SearchList.ADS);
      return filtered;
    })
  );

  forumSearchResults$ = this.searchResults$.pipe(
    map((value: any[]) => {
      const filtered = value.filter(val => val.source == SearchList.FORUM);
      return filtered;
    })
  );

  forumPostSearchResults$ = this.searchResults$.pipe(
    map((value: any[]) => {
      const filtered = value.filter(val => val.source == SearchList.FORUM_POST);
      return filtered;
    })
  );

  querySubscription = this.query$
    .pipe(
      filter(q => !!q),
      switchMap(q =>
        this.searchService.searchAll(q!).pipe(
          map((response: any) => {
            if (q?.length && q?.length > 3) {
              this.gtag.Events.search(q);
            }
            this.searchResults$.next(response.results);
          }),
          tap(_ => this.stopSearching()),
          catchError(_ => {
            this.stopSearching();
            return _;
          })
        )
      )
    )
    .subscribe();

  constructor(
    private searchService: SearchService,
    private store: Store,
    private navigator: NavigatorService,
    private seo: SeoService,
    private gtag: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Showing Search Results',
      description: 'Search Results from MSME Gateway',
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  stopSearching() {
    this.searching$.next(false);
  }

  openArticle(slug: string) {
    this.navigator.article.goToViewDetailsPage(slug);
  }

  openMarketAd(id: number) {
    this.navigator.marketAd.goToViewDetailsPage(id);
  }

  openForum(slug: string) {
    this.navigator.forum.goToViewDetailsPage(slug);
  }

  openForumPost(slug: string) {
    this.selectedForum$.pipe(take(1)).subscribe(forum => {
      this.navigator.forum.goToReadForumPost(forum.slug as string, slug || '');
    });
  }
}
