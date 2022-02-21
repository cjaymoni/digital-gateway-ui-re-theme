import {
  AfterViewInit,
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
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-featured-articles-settings',
  templateUrl: './featured-articles-settings.component.html',
  styleUrls: ['./featured-articles-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedArticlesSettingsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  filteredArticles$ = new BehaviorSubject(new Array(0));

  searchArticleInput = new FormControl('', [Validators.minLength(3)]);

  selectedArticles$ = new BehaviorSubject(Array(0));

  mergeCurrentlySelected$ = this.themeStore.featuredArticles$
    .pipe(
      map(ha => {
        const newArray = [...this.selectedArticles$.getValue()].concat(
          [...ha].map(h => h.article)
        );
        this.selectedArticles$.next(newArray);
      })
    )
    .subscribe();

  constructor(
    private store: Store,
    private themeStore: ThemeSettingsStore,
    private articleService: ArticleService,
    private blockService: BlockService,
    private cdref: ChangeDetectorRef
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

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
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
    this.blockService
      .saveFeaturedArticles(this.selectedArticles$.getValue())
      .subscribe();
  }
}
