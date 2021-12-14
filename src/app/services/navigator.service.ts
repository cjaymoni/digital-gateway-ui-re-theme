import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  Routes,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Sidebar } from 'primeng/sidebar';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';
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
  ) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        // Construct the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: MenuItem[] = [];
        this.addBreadcrumb([], breadcrumbs, root);
        // Emit the new hierarchy

        const unique = breadcrumbs.reduce(
          (a, b) =>
            a.find(({ routerLink }) => routerLink === b.routerLink)
              ? a
              : a.concat(b as any),
          []
        );

        this.breadCrumbs$.next(unique);
      });
  }

  readonly breadCrumbs$ = new BehaviorSubject<MenuItem[]>([]);

  panelCloseEvent$ = new Observable();

  private panelTitle$ = new BehaviorSubject('');

  private modalTitle$ = new BehaviorSubject('');

  private modalRef!: DynamicDialogRef;

  private sidebarRef!: Sidebar;

  currentContext$ = this.store.select(selectUrl).pipe(
    filter(d => !!d),
    map(url => {
      let context = url.split('/')[1];

      if (url.includes('sign') || url.includes('login')) context = '';

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

  setModalRef(modalRef: DynamicDialogRef) {
    this.modalRef = modalRef;
  }

  getModalRef() {
    return this.modalRef;
  }

  setSidebarRef(sidebar: Sidebar) {
    this.sidebarRef = sidebar;
  }

  getSidebarRef() {
    return this.sidebarRef;
  }

  setModalTitle(title: string) {
    this.modalTitle$.next(title);
  }

  getModalTitle() {
    return this.modalTitle$.asObservable();
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
          this.router.navigate([
            context,
            {
              outlets: {
                [RouterOutlets.Modal]: null,
              },
            },
          ]);

          this.modalRef?.destroy();
        })
      )
      .subscribe();
  }

  private addBreadcrumb(
    parentUrl: string[],
    breadcrumbs: MenuItem[],
    route?: ActivatedRouteSnapshot
  ) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      // Add an element for the current route part
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: route.data['breadcrumb'],
          routerLink: '/' + routeUrl.join('/'),
        };
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(routeUrl, breadcrumbs, route.firstChild!);
    }
  }

  goBack() {
    if (this.router.navigated) {
      this.location.back();
    } else {
      this.goToRoute(['/']);
    }
  }

  addRightPanelRoutes(routesToAdd: Routes) {
    this.router.config.push(...routesToAdd);
  }

  goToRoute(route: any[]) {
    this.router.navigate(route);
  }

  article = new ArticleRoutes(this.router, this.panelTitle$, this.modalTitle$);
  forum = new ForumRoutes(this.router, this.panelTitle$, this.modalTitle$);
  forumPost = new ForumPostRoutes(
    this.router,
    this.panelTitle$,
    this.modalTitle$
  );
  marketAd = new MarketAdRoutes(
    this.router,
    this.panelTitle$,
    this.modalTitle$
  );
  auth = new AuthRoutes(this.router, this.panelTitle$, this.modalTitle$);
  resource = new ResourceRoutes(
    this.router,
    this.panelTitle$,
    this.modalTitle$
  );
}

class AppRoutesConfig {
  constructor(
    protected page: IPageItems,
    protected router: Router,
    protected panelTitleSubject$: BehaviorSubject<string>,
    protected modalTitleSubject$: BehaviorSubject<string>
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
    this.modalTitleSubject$.next(title);
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
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages['Articles'], router, subject, modalsubject);
  }

  // goToReadArticlePage(articleSlug: string) {
  //   this.router.navigate([this.page, `${SLUG_PREFIX}-${articleSlug}`]);
  // }
}

class ForumRoutes extends AppRoutesConfig {
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages['Forum'], router, subject, modalsubject);
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

  loadComments(id: any) {
    this.panelTitleSubject$.next('COMMENTS');
    this.router.navigate([
      this.page.main, //main
      {
        outlets: {
          [RouterOutlets.Right]: ['comments', id],
        },
        skipLocationChange: true,
      },
    ]);
  }
}

class ForumPostRoutes extends AppRoutesConfig {
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages['ForumPost'], router, subject, modalsubject);
  }
  goToReadForumPostPage(forumPostSlug: string) {
    this.router.navigate([this.page, `${SLUG_PREFIX}-${forumPostSlug}`]);
  }
}

class AuthRoutes extends AppRoutesConfig {
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages['Auth'], router, subject, modalsubject);
  }

  goToSignUp() {
    this.openPanel(Pages['Auth'].signup, 'Signup to create an account');
    this.panelTitleSubject$.next('Please create an account');
    this.router.navigate([
      '', //main
      {
        outlets: {
          [RouterOutlets.Right]: Pages.Auth.signup,
        },
      },
    ]);
  }

  goToLogin(title = 'Welcome back. Please Login') {
    this.panelTitleSubject$.next(title);
    this.router.navigate([
      '', //main
      {
        outlets: {
          [RouterOutlets.Right]: Pages.Auth.login,
        },
      },
    ]);
  }
}

class MarketAdRoutes extends AppRoutesConfig {
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages.MarketPlace, router, subject, modalsubject);
  }

  override goToViewDetailsPage(id: any) {
    this.router.navigate([
      this.page.main,
      ...this.page.viewDetails.replace(':id', id).split('/'),
    ]);
  }
}

class ResourceRoutes extends AppRoutesConfig {
  constructor(
    router: Router,
    subject: BehaviorSubject<string>,
    modalsubject: BehaviorSubject<string>
  ) {
    super(Pages.Resources, router, subject, modalsubject);
  }
}
