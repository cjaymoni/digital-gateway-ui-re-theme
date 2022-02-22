import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
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
  constructor(
    private themeStore: ThemeSettingsStore,
    private navigator: NavigatorService,
    private store: Store
  ) {}
  featuredArticles$ = this.store.select(articleSelectors.all);

  highlightArticles$ = this.themeStore.highlightArticlesArray$;

  ngOnInit() {}

  readArticle(slug: string) {
    this.navigator.article.goToViewDetailsPage(slug);
  }
}
