import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { SignUpMenu } from 'src/app/config/app-config';
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

  menuChangesSubscription = this.isLoggedIn$.pipe(
    filter(d => !!d),
    map(loggedIn => {})
  );

  searchInputControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  searchBar = false;

  constructor(
    private store: Store,
    private device: DeviceService,
    private navigator: NavigatorService,
    @Inject(LOGIN_SERVICE) public loginService: IAuthService
  ) {
    // this.
  }

  items$ = this.store.select(menuItemSelectors.menuItems);

  signUpMenu = SignUpMenu;

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

  searchTerm() {
    if (this.searchInputControl.valid) {
      this.navigator.goToRoute(['search', this.searchInputControl.value]);
      this.searchInputControl.setValue('');
    }
  }

  toggleSearchBar() {
    this.searchBar = !this.searchBar;
  }
}
