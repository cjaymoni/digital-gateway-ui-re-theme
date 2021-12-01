import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, RouterLink, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Pages, RouterOutlets, SLUG_PREFIX } from '../config/app-config';
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

  private panelTitle$ = new BehaviorSubject('');

  openPanel(navigation: string | string[], title = '') {
    this.panelTitle$.next(title);
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

  goBack() {
    this.location.back();
  }

  addRightPanelRoutes(routesToAdd: Routes) {
    this.router.config.push(...routesToAdd);
  }

  goToRoute(route: any[]) {
    this.router.navigate(route);
  }

  article = new ArticleRoutes(this.router);
  forum = new ForumRoutes(this.router);
}

class AppRoutesConfig {
  constructor(protected page: Pages, protected router: Router) {}

  go() {
    this.router.navigate([this.page]);
  }

  goToAddPage() {
    this.router.navigate([this.page, Pages.add]);
  }

  goToEditPage() {
    this.router.navigate([this.page, Pages.edit]);
  }

  goToViewPage() {
    this.router.navigate([this.page, Pages.view]);
  }
}

class ArticleRoutes extends AppRoutesConfig {
  constructor(router: Router) {
    super(Pages.Articles, router);
  }

  goToReadArticlePage(articleSlug: string) {
    this.router.navigate([this.page, `${SLUG_PREFIX}-${articleSlug}`]);
  }
}

class ForumRoutes extends AppRoutesConfig {
  constructor(router: Router) {
    super(Pages.Forum, router);
  }
}
