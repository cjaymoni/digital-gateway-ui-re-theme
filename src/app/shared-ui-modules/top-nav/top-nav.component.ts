import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { LoggedInMenu, SignUpMenu } from 'src/app/config/app-config';
import { LOGIN_SERVICE } from 'src/app/config/injectables';
import { IAuthService } from 'src/app/models/auth-service';
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
  loggedInUser$ = this.store.select(userAuthSelectors.loggedInUser);

  isLoggedIn$ = this.store.select(userAuthSelectors.isLoggedIn);

  isHandheld$ = this.device.isHandheld$;

  searchInputControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(
    private store: Store,
    private device: DeviceService,
    private navigator: NavigatorService,
    @Inject(LOGIN_SERVICE) public loginService: IAuthService
  ) {}

  items$ = this.store.select(menuItemSelectors.menuItems);

  signUpMenu = SignUpMenu;

  loggedInMenu = this.loggedInUser$.pipe(
    map(user => {
      if (user) {
        return [...LoggedInMenu(user.role), ...this.logoutMenu()];
      } else {
        return [];
      }
    })
  );

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
    this.navigator.auth.goToLogin();
  }

  logout = () => {
    this.loginService.logout().subscribe(_ => this.navigator.goToRoute(['/']));
  };

  logoutMenu(): MenuItem[] {
    return [
      {
        id: 'logout',
        label: 'Logout',
        command: this.logout,
        icon: 'pi pi-power-off',
      },
    ];
  }

  searchTerm() {}
}
