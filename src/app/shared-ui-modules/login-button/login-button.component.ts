import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { LoggedInMenu } from 'src/app/config/app-config';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { DeviceService } from 'src/app/services/device.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { userAuthSelectors } from 'src/app/store/selectors/user-auth.selectors';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent implements OnInit, AfterViewInit {
  loggedInUser$ = this.store.select(userAuthSelectors.loggedInUser);

  isLoggedIn$ = this.store.select(userAuthSelectors.isLoggedIn);

  isHandheld$ = this.device.isHandheld$;

  loggedInMenu = this.loggedInUser$.pipe(
    map(user => {
      if (user) {
        return [...LoggedInMenu(user.role), ...this.logoutMenu()];
      } else {
        return [];
      }
    })
  );

  constructor(
    private store: Store,
    private device: DeviceService,
    private loginService: LoginService,
    private navigator: NavigatorService,
    private cdref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cdref.detectChanges();
    }
  }

  ngOnInit(): void {}

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

  goToLoginPage() {
    this.navigator.auth.goToLogin();
  }
}
