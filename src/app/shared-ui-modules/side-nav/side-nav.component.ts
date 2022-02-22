import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tagSelectors } from 'src/app/store/selectors/tag.selectors';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(private themeSetting: ThemeSettingsStore, private store: Store) {}

  showAll = false;

  // featuredCategory$ = this.themeSetting.featuredCategoryArray$;
  featuredTags$ = this.store.select(tagSelectors.featuredArticleTags);

  ngOnInit(): void {}

  viewMore() {
    this.showAll = !this.showAll;
  }
}
