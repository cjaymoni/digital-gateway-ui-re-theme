import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { Pages } from 'src/app/config/app-config';
import { DeviceService } from 'src/app/services/device.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { menuItemActions } from 'src/app/store/actions/menu-items.actions';
import { menuItemSelectors } from 'src/app/store/selectors/menu-items.selectors';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';

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

  constructor(
    private store: Store,
    private device: DeviceService,
    private navigator: NavigatorService
  ) {}

  items$ = this.store.select(menuItemSelectors.menuItems);

  // items$ = this.device.isHandheld$.pipe(
  //   switchMap(isHandheld =>
  //     isHandheld
  //       ? this.store
  //           .select(menuItemSelectors.menuItems)
  //           .pipe(map(menu => menu as MenuItem[]))
  //       : this.store.select(menuItemSelectors.topMenuItems).pipe(
  //           map(topMenuItems =>
  //             topMenuItems.map((item: MenuItem) => {
  //               item.command = event => {
  //                 this.selectMenu(event.item.id, item.routerLink);
  //               };
  //               item.routerLink = (item as any)?.link;
  //               return item;
  //             })
  //           )
  //         )
  //   )
  // );

  // items$ = of([
  //   {
  //     id: 'info-hub',
  //     label: 'Information Hub',
  //     routerLink: [Pages.Articles.main],
  //   },
  //   {
  //     id: 'forum',
  //     label: 'Forums',
  //     routerLink: [Pages.Forum.main],
  //   },
  //   {
  //     id: 'market-place',
  //     label: 'Market Place',
  //     routerLink: [Pages.MarketPlace.main],
  //   },
  // ]);

  ngOnInit(): void {}

  selectMenu(id: number, link?: [string]) {
    this.store.dispatch(
      menuItemActions.selectMenuItem({
        menuItemId: id,
      })
    );

    if (link) {
      this.navigator.goToRoute(link);
    }
  }

  goToLoginPage() {
    this.navigator.auth.goToLogin('Login to continue');
  }
}
