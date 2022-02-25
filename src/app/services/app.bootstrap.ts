import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';

import { environment } from 'src/environments/environment';
import { APP_USER_TOKEN } from '../config/app-config';
import { LocalStorageService } from '../helpers/localstorage.service';
import { SeoService } from '../helpers/seo.service';
import { articleActions } from '../store/actions/article.actions';
import { categoryActions } from '../store/actions/category.actions';
import { forumActions } from '../store/actions/forum.actions';
import { productAdActions } from '../store/actions/product-ad.actions';
import { productTypeActions } from '../store/actions/product-type.actions';
import { tagActions } from '../store/actions/tag.actions';
import { ThemeSettingsStore } from '../store/theme-settings.state';
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
    private route: ActivatedRoute,
    private themeSettings: ThemeSettingsStore
  ) {}

  initializeAppData() {
    this.themeSettings.getHomepageData();
    this.store.dispatch(tagActions.fetch());
    this.store.dispatch(categoryActions.fetch());
    // this.store.dispatch(productTypeActions.fetch());
    // this.store.dispatch(articleActions.fetch());
    // this.store.dispatch(productAdActions.fetch());
    // this.store.dispatch(forumActions.fetch());

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.seo.setURL(`${environment.APP_URL}${event.url}`);
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        // if (returnUrl) {
        //   let url: string = returnUrl;
        //   url = url.includes('login') ? url.split('(')[0] : url;
        //   this.router.navigateByUrl(url);
        // }
      }
    });
  }

  initializeLogin() {
    const user: any = this.cookieService.getObject(APP_USER_TOKEN) || null;

    if (user?.email) {
      this.store.dispatch(userAuthActions.loginSuccessful({ user }));
    }
  }
}
