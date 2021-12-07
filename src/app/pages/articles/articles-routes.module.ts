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

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
  },
  {
    path: Pages.Articles.view,
    component: ArticleDetailsComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [ArticleGuard],
  },
  {
    path: Pages.Articles.edit,
    component: ArticleFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [ArticleGuard],
  },
  {
    path: 'search/:category',
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
    outlet: RouterOutlets.Modal,
    canActivate: [ArticleGuard],
  },
  {
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
export class ArticleRoutesModule {}
