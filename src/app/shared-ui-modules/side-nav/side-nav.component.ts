import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { trackById } from 'src/app/config/app-config';
import { Article } from 'src/app/models/article.model';
import { Tag } from 'src/app/models/tag.model';
import { ArticleService } from 'src/app/pages/articles/services/articles.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleActions } from 'src/app/store/actions/article.actions';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(
    private navigator: NavigatorService,
    private store: Store,
    private articleService: ArticleService
  ) {}

  showAll = false;
  currentIndex = -1;
  trackById = trackById;

  // featuredCategory$ = this.themeSetting.featuredCategoryArray$;
  featuredTags$ = this.store.select(tagSelectors.featuredArticleTags);
  loading$ = new BehaviorSubject(false);
  articles$: BehaviorSubject<Article[]> = new BehaviorSubject([] as Article[]);

  display = false;

  ngOnInit(): void {}

  viewMore() {
    this.showAll = !this.showAll;
  }

  getRelatedArtciles(tag: Tag, index: number) {
    this.display = !this.display;

    if (this.currentIndex !== index) {
      this.display = true;
    }

    if (this.display) {
      this.currentIndex = index;
    }
   
    this.loading$.next(true);
    this.articleService
      .searchArticle({
        tag: tag.id,
      })
      .pipe(
        take(1),
        map(articles => {
          this.loading$.next(false);
          this.articles$.next(articles);
        }),
        catchError(e => {
          this.loading$.next(false)
          return e;
        })
      )
      .subscribe();
  }

  readArticle(article: Article) {
    this.display = false;
    this.navigator.article.goToViewDetailsPage(article.slug);
  }

  clickOutsidePanel(event: Event) {
    event.stopPropagation();
    if (this.display) {
      this.display = false;
    }
  }
}
