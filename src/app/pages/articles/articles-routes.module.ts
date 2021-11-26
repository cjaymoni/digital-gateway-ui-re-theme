import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { ArticleDetailsComponent } from 'src/app/shared-ui-modules/article-details/article-details.component';
import { ArticleFormComponent } from 'src/app/shared-ui-modules/article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleGuard } from './guard/article.guard';
import { MyArticlesListComponent } from './my-articles-list/my-articles-list.component';

export function slugMatcher(url: UrlSegment[]) {
  return url[0]?.path.startsWith(SLUG_PREFIX) ? { consumed: url } : null;
}

const rightPanelRoutes: Routes = [
  {
    path: 'view',
    component: ArticleDetailsComponent,
    outlet: RouterOutlets.Right,
    canActivate: [ArticleGuard],
  },
  {
    path: 'edit',
    component: ArticleFormComponent,
    outlet: RouterOutlets.Right,
    canActivate: [ArticleGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
  },

  {
    path: 'my-articles',
    component: MyArticlesListComponent,
    canActivate: [ArticleGuard],
  },

  {
    path: 'add',
    component: ArticleFormComponent,
    canActivate: [ArticleGuard],
  },
  {
    matcher: slugMatcher,
    component: ArticleDetailsComponent,
    data: { fetch: true },
    canActivate: [ArticleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutesModule {
  /**
   *
   */
  constructor(private router: Router) {
    this.router.config.push(...rightPanelRoutes);
  }
}
