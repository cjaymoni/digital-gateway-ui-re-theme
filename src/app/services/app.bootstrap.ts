import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import {
  APP_REFRESH_TOKEN,
  APP_TOKEN,
  APP_USER_TOKEN,
} from '../config/app-config';
import { LocalStorageService } from '../helpers/localstorage.service';
import { SeoService } from '../helpers/seo.service';
import { categoryActions } from '../store/actions/category.actions';
import { tagActions } from '../store/actions/tag.actions';
import { userAuthActions } from './../store/actions/user-auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AppBootstrap {
  /**
   *
   */
  constructor(
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
    private seo: SeoService,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  initializeAppData() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(tagActions.fetch());
      this.store.dispatch(categoryActions.fetch());
    }
    this.initializeLogin();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.seo.setURL(`${environment.APP_URL}${event.url}`);
      }
    });
  }

  initializeLogin() {
    const user: any =
      this.cookieService.getObject(APP_USER_TOKEN) ||
      JSON.parse(this.localStorageService.getItem(APP_USER_TOKEN) || '{}');

    if (user?.email) {
      if (!this.cookieService.hasKey(APP_TOKEN)) {
        const appToken = this.localStorageService.getItem(APP_TOKEN) || '';
        const appRefreshToken =
          this.localStorageService.getItem(APP_REFRESH_TOKEN) || '';
        this.cookieService.putObject(APP_USER_TOKEN, user);
        this.cookieService.put(APP_REFRESH_TOKEN, appRefreshToken);
        this.cookieService.put(APP_TOKEN, appToken);
      }
      this.store.dispatch(userAuthActions.loginSuccessful({ user }));
    }
  }
}
