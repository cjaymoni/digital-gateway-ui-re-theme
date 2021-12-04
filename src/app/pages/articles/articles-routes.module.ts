import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { Pages, RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ArticleDetailsComponent } from 'src/app/shared-ui-modules/article-details/article-details.component';
import { ArticleFormComponent } from 'src/app/shared-ui-modules/article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleGuard } from './guard/article.guard';
import { SelectArticleGuard } from './guard/select-article.guard';
import { MyArticlesListComponent } from './my-articles-list/my-articles-list.component';

export function slugMatcher(url: UrlSegment[]) {
  // console.log(url);
  // return { consumed: url };
  // return url[0]?.path.startsWith('') ? { consumed: url } : null;
}

const rightPanelRoutes: Routes = [
  {
    // path: Pages.Articles.view,
    matcher: (url: UrlSegment[]) => {
      return url[0]?.path.startsWith('view-article') ? { consumed: url } : null;
    },
    component: ArticleDetailsComponent,
    outlet: RouterOutlets.Right,
    data: { selectArticle: true },
    canActivate: [SelectArticleGuard],
  },
  {
    // path: Pages.Articles.edit,
    matcher: (url: UrlSegment[]) => {
      return url[0]?.path.startsWith('edit-article') ? { consumed: url } : null;
    },
    component: ArticleFormComponent,
    outlet: RouterOutlets.Right,
    canActivate: [SelectArticleGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
  },

  {
    path: Pages.Articles.myList,
    component: MyArticlesListComponent,
    canActivate: [ArticleGuard],
  },

  {
    path: Pages.Articles.add,
    component: ArticleFormComponent,
    canActivate: [ArticleGuard],
  },
  {
    // matcher: slugMatcher,
    path: Pages.Articles.viewDetails,
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
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(rightPanelRoutes);
  }
}
