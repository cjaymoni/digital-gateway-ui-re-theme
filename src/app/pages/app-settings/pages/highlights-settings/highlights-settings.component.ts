import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  take,
  tap,
} from 'rxjs';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { BlockService } from 'src/app/services/blocks.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-highlights-settings',
  templateUrl: './highlights-settings.component.html',
  styleUrls: ['./highlights-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsSettingsComponent implements OnInit, OnDestroy {
  filteredArticles$ = new BehaviorSubject(new Array(0));

  searchArticleInput = new FormControl('', [Validators.minLength(3)]);

  selectedArticles = new Array(0);

  mergeCurrentlySelected$ = this.themeStore.highlightArticles$
    .pipe(
      map(ha => {
        const newArray = [...this.selectedArticles].concat(
          [...ha].map(h => h.article)
        );
        this.selectedArticles = newArray;
      })
    )
    .subscribe();

  constructor(
    private store: Store,
    private themeStore: ThemeSettingsStore,
    private articleService: ArticleService,
    private blockService: BlockService
  ) {}

  ngOnInit() {
    this.mergeCurrentlySelected$.add(
      this.searchArticleInput.valueChanges
        .pipe(
          tap(_ => {}),
          distinctUntilChanged(),
          skip(2),
          debounceTime(300)
        )
        .subscribe(query => {
          if (query.trim() === '') {
            this.filteredArticles$.next([]);
            return;
          } else {
            this.searchArticle(query);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.mergeCurrentlySelected$.unsubscribe();
  }

  searchArticle(query: string) {
    this.articleService
      .searchArticle({
        search: query,
      })
      .pipe(
        take(1),
        map((articles: any) => {
          const newArray = [...articles];
          this.filteredArticles$.next(newArray);
        })
      )
      .subscribe();
  }

  saveChanges() {
    this.blockService.saveHiglightedArticles(this.selectedArticles).subscribe();
  }
}
