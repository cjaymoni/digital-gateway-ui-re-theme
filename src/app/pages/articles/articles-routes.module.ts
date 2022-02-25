import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, Roles, RouterOutlets } from 'src/app/config/app-config';
import { RoleGuard } from 'src/app/services/role.guard';
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
    canActivate: [RoleGuard, ArticleGuard],
    data: { breadcrumb: 'Preview', roles: [Roles.Admin, Roles.Editor] },
  },
  {
    path: Pages.Articles.edit,
    component: ArticleFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [RoleGuard, ArticleGuard],
    data: {
      breadcrumb: 'Edit',
      roles: [Roles.Admin, Roles.Editor],
    },
  },

  {
    path: 'search/:category',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'Search' },
  },
  {
    path: 'tag/:tag',
    component: ArticleListComponent,
    canActivate: [ArticleGuard],
    data: { breadcrumb: 'Search' },
  },

  {
    path: Pages.Articles.myList,
    component: MyArticlesListComponent,
    canActivate: [RoleGuard, ArticleGuard],
    data: {
      breadcrumb: 'List',
      roles: [Roles.Admin, Roles.Editor],
    },
  },

  {
    path: Pages.Articles.add,
    component: ArticleFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [RoleGuard, ArticleGuard],
    data: {
      breadcrumb: 'Add',
      roles: [Roles.Admin, Roles.Editor, Roles.Reporter],
    },
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
