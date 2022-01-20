import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { MultimediaManagementGuard } from './guard/multimedia-management.guard';
import { MultimediaFormComponent } from './multimedia-form/multimedia-form.component';
import { MultimediaListComponent } from './multimedia-list/multimedia-list.component';

const routes: Routes = [
  {
    path: '',
    component: MultimediaListComponent,
    canActivate: [MultimediaManagementGuard],
  },
  {
    path: Pages.MultimediaManagement.add,
    component: MultimediaFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [MultimediaManagementGuard],
    data: {
      breadcrumb: 'Add MultiMedia',
    },
  },
  {
    path: Pages.MultimediaManagement.view,
    component: MultimediaFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [MultimediaManagementGuard],
    data: {
      breadcrumb: 'View MultiMedia',
    },
  },
  {
    path: Pages.MultimediaManagement.edit,
    component: MultimediaFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [MultimediaManagementGuard],
    data: {
      breadcrumb: 'Edit MultiMedia',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultimediaManagementRoutingModule {}
