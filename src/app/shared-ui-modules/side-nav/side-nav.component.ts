import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { menuItemSelectors } from 'src/app/store/selectors/menu-items.selectors';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor(private store: Store) {}

  subMenuItems$ = this.store
    .select(menuItemSelectors.subMenuItems)
    .pipe(map(items => items as MenuItem[]));

  selectedMenu$ = this.store.select(menuItemSelectors.selectedMenu);

  ngOnInit(): void {}
}
