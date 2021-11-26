import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { Pages, RouterOutlets, SLUG_PREFIX } from '../config/app-config';
import { selectUrl } from '../store/selectors/router.selectors';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(private router: Router, private store: Store) {}

  panelActive$ = this.store.select(selectUrl).pipe(
    filter(currentRoute => !!currentRoute),
    map(cr => cr.includes(RouterOutlets.Right))
  );

  openPanel(navigation: string) {
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
