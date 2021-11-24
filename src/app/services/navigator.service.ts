import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(private router: Router) {}

  hidePanel() {
    this.router.navigate(
      [
        {
          outlets: {
            [RouterOutlets.Right]: null,
          },
        },
      ],
      {}
    );
  }

  article = new ArticleRoutes(this.router);
}

class AppRoutesConfig {
  constructor(protected page: Pages, protected router: Router) {}

  go() {
    this.router.navigate([this.page]);
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
