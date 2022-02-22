import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, Roles, RouterOutlets } from 'src/app/config/app-config';
import { RoleGuard } from 'src/app/services/role.guard';
import { CategoryFormComponent } from 'src/app/shared-ui-modules/category-form/category-form.component';
import { ArticleGuard } from '../articles/guard/article.guard';
import { ContentManagementListPageComponent } from './content-management-list-page/content-management-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContentManagementListPageComponent,
  },
  {
    path: Pages.Category.add,
    component: CategoryFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [RoleGuard, ArticleGuard],
    data: {
      roles: [Roles.Admin, Roles.Editor, Roles.Contributor],
    },
  },
  {
    path: Pages.Category.edit,
    component: CategoryFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [RoleGuard, ArticleGuard],
    data: {
      roles: [Roles.Admin, Roles.Editor, Roles.Contributor],
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentManagementRoutingModule {}
