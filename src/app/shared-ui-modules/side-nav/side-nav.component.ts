import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { Tag } from 'src/app/models/tag.model';
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
  constructor(private navigator: NavigatorService, private store: Store) {}

  showAll = false;

  // featuredCategory$ = this.themeSetting.featuredCategoryArray$;
  featuredTags$ = this.store.select(tagSelectors.featuredArticleTags);
  loading$ = this.store.select(articleSelectors.loading);
  articles$ = this.store.select(articleSelectors.searchResults);

  display = false;

  ngOnInit(): void {}

  viewMore() {
    this.showAll = !this.showAll;
  }

  getRelatedArtciles(tag: Tag) {
    this.display = !this.display;

    if (!this.display) return;

    this.store.dispatch(
      articleActions.searchArticle({
        searchParams: {
          tag: tag.id,
        },
      })
    );
  }

  readArticle(article: Article) {
    this.display = false;
    this.navigator.article.goToViewDetailsPage(article.slug);
  }
}
