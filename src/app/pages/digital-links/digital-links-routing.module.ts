import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { DigitalLinkFormComponent } from './digital-link-form/digital-link-form.component';
import { DigitalLinkListComponent } from './digital-link-list/digital-link-list.component';
import { DigitalLinkGuard } from './guard/digital-link.guard';

const routes: Routes = [
  {
    path: '',
    component: DigitalLinkListComponent,
    canActivate: [DigitalLinkGuard],
    pathMatch: 'full',
  },
  {
    path: Pages.DigitalLinks.add,
    component: DigitalLinkFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [DigitalLinkGuard],
    data: {
      breadcrumb: 'Add DirectLink',
    },
    pathMatch: 'full',
  },
  {
    path: Pages.DigitalLinks.view,
    component: DigitalLinkFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [DigitalLinkGuard],
    data: {
      breadcrumb: 'View DirectLink',
    },
    pathMatch: 'full',
  },
  {
    path: Pages.DigitalLinks.edit,
    component: DigitalLinkFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [DigitalLinkGuard],
    data: {
      breadcrumb: 'Edit DirectLink',
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalLinksRoutingModule {}
