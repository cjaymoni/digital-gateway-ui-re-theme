import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { filter, map, switchMap } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { DeviceService } from 'src/app/services/device.service';
import { menuItemActions } from 'src/app/store/actions/menu-items.actions';
import { menuItemSelectors } from 'src/app/store/selectors/menu-items.selectors';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';
import { Pages } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent implements OnInit {
  loggedInUser$ = this.store
    .select(userAuthSelectors.loggedInUser)
    .pipe(filter(user => !!user));

  isHandheld$ = this.device.isHandheld$;

  constructor(private store: Store, private device: DeviceService,private navigator: NavigatorService,) {}

  items$ = this.device.isHandheld$.pipe(
    switchMap(isHandheld =>
      isHandheld
        ? this.store
            .select(menuItemSelectors.menuItems)
            .pipe(map(menu => menu as MenuItem[]))
        : this.store.select(menuItemSelectors.topMenuItems).pipe(
            map(topMenuItems =>
              topMenuItems.map(item => {
                item.command = event => {
                  this.selectMenu(event.item.id);
                };

                return item;
              })
            )
          )
    )
  );

  ngOnInit(): void {}

  selectMenu(id: number) {
    this.store.dispatch(
      menuItemActions.selectMenuItem({
        menuItemId: id,
      })
    );
  }

  goToLoginPage() {
    this.navigator.openPanel(Pages.edit);
  }
}
