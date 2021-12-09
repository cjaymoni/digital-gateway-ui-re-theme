import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { ArticleDetailsComponent } from 'src/app/shared-ui-modules/article-details/article-details.component';
import { ArticleFormComponent } from 'src/app/shared-ui-modules/article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleGuard } from './guard/article.guard';
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
    data: { breadcrumb: 'Preview' },
  },
  {
    path: Pages.Articles.edit,
    component: ArticleFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'Edit' },
  },
  {
    path: 'search/:category',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'Search' },
  },

  {
    path: Pages.Articles.myList,
    component: MyArticlesListComponent,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'List' },
  },

  {
    path: Pages.Articles.add,
    component: ArticleFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'Add' },
  },
  {
    path: Pages.Articles.viewDetails,
    component: ArticleDetailsComponent,
    data: { fetch: true, breadcrumb: 'Read Article' },
    canActivate: [ArticleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutesModule {}
