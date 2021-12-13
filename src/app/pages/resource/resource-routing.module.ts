import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, Roles } from 'src/app/config/app-config';
import { RoleGuard } from 'src/app/services/role.guard';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceListComponent } from './resource-list/resource-list.component';

const routes: Routes = [
  {
    path: '',
    component: ResourceListComponent,
    data: {
      breadcrumb: 'Resources List',
    },
  },
  {
    path: Pages.Resources.add,
    component: ResourceFormComponent,
    canActivate: [RoleGuard],
    data: {
      breadcrumb: 'Add Resource',
      roles: [Roles.Admin, Roles.Editor, Roles.ServiceProvider],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
