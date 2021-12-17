import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { selectRouteParam } from 'src/app/store/selectors/router.selectors';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  query$ = this.store.select(selectRouteParam('query'));

  searching$ = new BehaviorSubject(true);
  searchResults$ = new BehaviorSubject(new Array(0));

  querySubscription = this.query$
    .pipe(
      filter(q => !!q),
      switchMap(q =>
        this.searchService.searchAll(q!).pipe(
          map((response: any) => this.searchResults$.next(response.results)),
          tap(_ => this.stopSearching()),
          catchError(_ => {
            this.stopSearching();
            return _;
          })
        )
      )
    )
    .subscribe();

  constructor(private searchService: SearchService, private store: Store) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  stopSearching() {
    this.searching$.next(false);
  }
}
