import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';
import {
  Context,
  IPageItems,
  Pages,
  RouterOutlets,
  SLUG_PREFIX,
} from '../config/app-config';
import {
  selectCurrentRoute,
  selectFragment,
  selectUrl,
} from '../store/selectors/router.selectors';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(
    private router: Router,
    private store: Store,
    private location: Location
  ) {}

  panelCloseEvent$ = new Observable();

  currentContext$ = this.store.select(selectUrl).pipe(
    filter(d => !!d),
    map(url => {
      const context = url.split('/')[1];
      // return Context[context as any];
      return context;
    })
  );

  panelActive$ = this.store.select(selectUrl).pipe(
    filter(currentRoute => !!currentRoute),
    map(cr => cr.includes(RouterOutlets.Right))
  );

  modalActive$ = this.store.select(selectUrl).pipe(
    filter(currentRoute => !!currentRoute),
    map(cr => cr.includes(RouterOutlets.Modal))
  );

  setPanelTitle(title: string) {
    this.panelTitle$.next(title);
  }

  getPanelTitle() {
    return this.panelTitle$.asObservable();
  }

  hidePanel() {
    this.currentContext$
      .pipe(
        take(1),
        tap(context => {
          this.router.navigate([
            context,
            {
              outlets: {
                [RouterOutlets.Right]: null,
              },
            },
          ]);
        })
      )
      .subscribe();
  }

  closeModal() {
    this.currentContext$
      .pipe(
        take(1),
        tap(context => {
          console.log(context);

          this.router.navigate([
            context,
            {
              outlets: {
                [RouterOutlets.Modal]: null,
              },
            },
          ]);
        })
      )
      .subscribe();
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

  noReuse() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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

  openPanel(navigation: string[], title = '') {
    this.panelTitleSubject$.next(title);
    this.router.navigate([
      navigation[0], //main
      {
        outlets: {
          [RouterOutlets.Right]: navigation.slice(1),
        },
      },
    ]);
  }

  openModal(navigation: string[], title = '') {
    this.panelTitleSubject$.next(title);
    console.log(navigation);

    this.router.navigate([
      navigation[0], //main
      {
        outlets: {
          [RouterOutlets.Modal]: navigation.slice(1),
        },
      },
    ]);
  }

  go() {
    this.router.navigate([this.page.main]);
  }

  goToAddPage(route = RouterOutlets.Main) {
    const nav = [this.page.main, this.page.add];
    route === RouterOutlets.Right
      ? this.openPanel(nav, 'CREATE NEW')
      : route === RouterOutlets.Modal
      ? this.openModal(nav, 'CREATE NEW')
      : this.router.navigate(nav);
  }

  goToEditPage(id: string, title = 'UPDATE', route = RouterOutlets.Right) {
    const nav = this.page.edit.split('/');
    nav[1] = id; //replace id after split
    route === RouterOutlets.Right
      ? this.openPanel([this.page.main, ...nav], title)
      : this.openModal([this.page.main, ...nav], title);
  }

  closePanel() {
    this.router.navigate([
      this.page.main,
      {
        outlets: {
          [RouterOutlets.Right]: null,
        },
      },
    ]);
  }

  goToViewPage(id: string, title = 'PREVIEW', route = RouterOutlets.Right) {
    const nav = this.page.view.split('/');
    nav[1] = id; //replace id after split
    route === RouterOutlets.Right
      ? this.openPanel([this.page.main, ...nav], title)
      : this.openModal([this.page.main, ...nav], title);
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
  goToReadForumPost(forumSlug: string, forumPostSlug: string) {
    const nav = [
      // this.page.viewPostDetails.replace('forum-room', forumRoom),
      ...(this.page as any).viewPost
        .replace(':slug', forumSlug)
        .replace(':post', forumPostSlug)
        .split('/'),
    ];
    this.router.navigate([
      this.page.main,
      // this.page.viewPostDetails.replace('forum-room', forumRoom),
      ...nav,
    ]);
  }
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
