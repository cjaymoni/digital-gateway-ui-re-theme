import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { PartnersFormComponent } from './partners-form/partners-form.component';
import { PartnersGuard } from './guard/partners.guard';

const routes: Routes = [
  {
    path: '',
    component: PartnersListComponent,
    canActivate: [PartnersGuard],
    pathMatch: 'full',
  },
  {
    path: Pages.Partners.add,
    component: PartnersFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [PartnersGuard],
    data: {
      breadcrumb: 'Add Partner',
    },
  },
  {
    path: Pages.Partners.view,
    component: PartnersFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [PartnersGuard],
    data: {
      breadcrumb: 'View Partner',
    },
  },
  {
    path: Pages.Partners.edit,
    component: PartnersFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [PartnersGuard],
    data: {
      breadcrumb: 'Edit Partner',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersRoutingModule {}
