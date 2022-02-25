import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { trackByAny, trackById } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-right-nav-card',
  templateUrl: './right-nav-card.component.html',
  styleUrls: ['./right-nav-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightNavCard implements OnInit {
  trackBy = trackById;

  trackAny = trackByAny;

  constructor(
    private themeStore: ThemeSettingsStore,
    private navigator: NavigatorService,
    private store: Store
  ) {}

  featuredArticles$ = this.themeStore.featuredArticles$;

  highlightArticles$ = this.themeStore.highlightArticlesArray$;

  multimedia$ = this.themeStore.featuredMultimedia$;

  ngOnInit() {}

  readArticle(slug: string) {
    this.navigator.article.goToViewDetailsPage(slug);
  }
}
