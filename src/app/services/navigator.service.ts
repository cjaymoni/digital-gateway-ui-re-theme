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

  readArticle(articleSlug: string) {
    this.router.navigate([Pages.Articles, `${SLUG_PREFIX}-${articleSlug}`]);
  }
}
