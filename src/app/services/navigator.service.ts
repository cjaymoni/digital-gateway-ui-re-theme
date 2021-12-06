import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map } from 'rxjs';
import {
  IPageItems,
  Pages,
  RouterOutlets,
  SLUG_PREFIX,
} from '../config/app-config';
import { selectUrl } from '../store/selectors/router.selectors';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(
    private router: Router,
    private store: Store,
    private location: Location
  ) {}

  panelActive$ = this.store.select(selectUrl).pipe(
    filter(currentRoute => !!currentRoute),
    map(cr => cr.includes(RouterOutlets.Right))
  );

  setPanelTitle(title: string) {
    this.panelTitle$.next(title);
  }

  getPanelTitle() {
    return this.panelTitle$.asObservable();
  }

  hidePanel() {
    this.router.navigate([
      '',
      {
        outlets: {
          [RouterOutlets.Right]: null,
        },
      },
    ]);
  }

  private panelTitle$ = new BehaviorSubject('');

  goBack() {
    this.location.back();
  }

  addRightPanelRoutes(routesToAdd: Routes) {
    this.router.config.push(...routesToAdd);
  }

  goToRoute(route: any[]) {
    this.router.navigate(route);
  }

  article = new ArticleRoutes(this.router, this.panelTitle$);
  forum = new ForumRoutes(this.router, this.panelTitle$);
  forumPost = new ForumPostRoutes(this.router, this.panelTitle$);
  marketAd = new MarketAdRoutes(this.router, this.panelTitle$);
  auth = new AuthRoutes(this.router, this.panelTitle$);
}

class AppRoutesConfig {
  constructor(
    protected page: IPageItems,
    protected router: Router,
    protected panelTitleSubject$: BehaviorSubject<string>
  ) {}

  openPanel(navigation: string | string[] | any, title = '') {
    this.panelTitleSubject$.next(title);
    this.router.navigate([
      {
        outlets: {
          [RouterOutlets.Right]: navigation,
        },
      },
    ]);
  }

  hidePanel() {
    this.router.navigate([
      '',
      {
        outlets: {
          [RouterOutlets.Right]: null,
        },
      },
    ]);
  }

  go() {
    this.router.navigate([this.page.main]);
  }

  goToAddPage() {
    this.router.navigate([this.page.main, this.page.add]);
  }

  goToEditPage(id: string, title = 'UPDATE') {
    this.openPanel([this.page.edit.replace('id', id)], title);
  }

  goToViewPage(id: string, title = 'PREVIEW') {
    this.openPanel([this.page.view.replace('id', id)], title);
  }

  goToViewDetailsPage(slug: string) {
    this.router.navigate([
      this.page.main,
      this.page.viewDetails.replace(':slug', slug),
    ]);
  }

  goToListPage() {
    this.router.navigate([this.page.main, this.page.myList]);
  }
}

class ArticleRoutes extends AppRoutesConfig {
  constructor(router: Router, subject: BehaviorSubject<string>) {
    super(Pages['Articles'], router, subject);
  }

  // goToReadArticlePage(articleSlug: string) {
  //   this.router.navigate([this.page, `${SLUG_PREFIX}-${articleSlug}`]);
  // }
}

class ForumRoutes extends AppRoutesConfig {
  constructor(router: Router, subject: BehaviorSubject<string>) {
    super(Pages['Forum'], router, subject);
  }
  // goToReadForumPage(forumSlug: string) {
  //   this.router.navigate([this.page, `${SLUG_PREFIX}-${forumSlug}`]);
  // }
}

class ForumPostRoutes extends AppRoutesConfig {
  constructor(router: Router, subject: BehaviorSubject<string>) {
    super(Pages['ForumPost'], router, subject);
  }
  goToReadForumPostPage(forumPostSlug: string) {
    this.router.navigate([this.page, `${SLUG_PREFIX}-${forumPostSlug}`]);
  }
}

class AuthRoutes extends AppRoutesConfig {
  constructor(router: Router, subject: BehaviorSubject<string>) {
    super(Pages['Auth'], router, subject);
  }

  goToSignUp() {
    this.openPanel(Pages['Auth'].signup, 'Signup to create an account');
  }

  goToLogin(title = 'Welcome back. Please Login') {
    this.openPanel(Pages['Auth'].login, title);
  }
}

class MarketAdRoutes extends AppRoutesConfig {
  constructor(router: Router, subject: BehaviorSubject<string>) {
    super(Pages.MarketPlace, router, subject);
  }

  override goToViewDetailsPage(id: any) {
    this.router.navigate([
      this.page.main,
      ...this.page.viewDetails.replace(':id', id).split('/'),
    ]);
  }
}
