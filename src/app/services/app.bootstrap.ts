import { userAuthActions } from './../store/actions/user-auth.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoryActions } from '../store/actions/category.actions';
import { productTypeActions } from '../store/actions/product-type.actions';
import { tagActions } from '../store/actions/tag.actions';
import { articleActions } from '../store/actions/article.actions';
import { productAdActions } from '../store/actions/product-ad.actions';
import { forumActions } from '../store/actions/forum.actions';
import { APP_USER_TOKEN, RouterOutlets } from '../config/app-config';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../helpers/localstorage.service';
import { SeoService } from '../helpers/seo.service';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs';

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
    private localStorage: LocalStorageService,
    private seo: SeoService,
    private route: ActivatedRoute
  ) {}

  initializeAppData() {
    this.store.dispatch(tagActions.fetch());
    this.store.dispatch(categoryActions.fetch());
    this.store.dispatch(productTypeActions.fetch());
    this.store.dispatch(articleActions.fetch());
    this.store.dispatch(productAdActions.fetch());
    this.store.dispatch(forumActions.fetch());

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.seo.setURL(`${environment.APP_URL}${event.url}`);
        // console.log(this.route.snapshot);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (returnUrl) {
          let url = returnUrl.replace('/', '');
          url = url.split('(')[0];
          this.router.navigateByUrl(url);
        }
      }
    });
  }

  initializeLogin() {
    const user = JSON.parse(this.localStorage.getItem(APP_USER_TOKEN) || '{}');
    if (user.email) {
      this.store.dispatch(userAuthActions.loginSuccessful({ user }));
    }
  }
}
