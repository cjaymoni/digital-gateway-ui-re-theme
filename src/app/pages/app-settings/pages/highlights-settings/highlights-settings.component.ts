import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, withLatestFrom } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-highlights-settings',
  templateUrl: './highlights-settings.component.html',
  styleUrls: ['./highlights-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsSettingsComponent implements OnInit, OnDestroy {
  filteredArticles$ = new BehaviorSubject(new Array(0));

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
    private articleService: ArticleService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mergeCurrentlySelected$.unsubscribe();
  }

  searchArticle(event: any) {
    // event.query
    if (event.query.trim() === '') {
      this.filteredArticles$.next([]);
      return;
    }
    this.articleService
      .searchArticle({
        slug: event.query,
      })
      .subscribe(articles => this.filteredArticles$.next(articles));
  }
}
