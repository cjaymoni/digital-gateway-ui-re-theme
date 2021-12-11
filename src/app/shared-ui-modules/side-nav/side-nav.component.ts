import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(private themeSetting: ThemeSettingsStore) {}

  featuredCategory$ = this.themeSetting.featuredCategoryArray$;

  ngOnInit(): void {}

  viewMore() {}
}
