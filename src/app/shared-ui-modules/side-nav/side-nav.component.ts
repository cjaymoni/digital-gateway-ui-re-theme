import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { menuItemSelectors } from 'src/app/store/selectors/menu-items.selectors';
import { categorySelectors } from 'src/app/store/selectors/category.selectors';
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
