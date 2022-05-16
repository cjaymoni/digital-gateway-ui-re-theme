import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersFormComponent } from 'src/app/shared-ui-modules/users-form/users-form.component';
import { UsersManagementGuard } from './guard/users-management.guard';
import { UsersListPageComponent } from './users-list-page/users-list-page.component';
import { Pages, RouterOutlets } from 'src/app/config/app-config';

const routes: Routes = [
  {
    path: '',
    component: UsersListPageComponent,
  },
  {
    path: Pages.UserManagement.add,
    component: UsersFormComponent,
    canActivate: [UsersManagementGuard],
    data: { breadcrumb: 'Add User' },
  },
  {
    path: Pages.UserManagement.view,
    component: UsersFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [UsersManagementGuard],
    data: { breadcrumb: 'View User' },
  },
  {
    path: Pages.UserManagement.edit,
    component: UsersFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [UsersManagementGuard],
    data: { breadcrumb: 'Edit User' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
