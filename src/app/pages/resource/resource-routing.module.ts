import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/config/app-config';
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
    data: {
      breadcrumb: 'Add Resource',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
