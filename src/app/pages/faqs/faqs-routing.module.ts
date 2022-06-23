import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { FaqListComponent } from './faqs-management/faq-list/faq-list.component';
import { FaqsViewComponent } from './faqs-view/faqs-view.component';
import { FaqFormComponent } from './faqs-management/faq-form/faq-form.component';
import { FaqGuard } from './guard/faq.guard';

const routes: Routes = [
  {
    path: '',
    component: FaqsViewComponent,
  },
  {
    path: Pages.Faqs.management,
    component: FaqListComponent,
    data: { breadcrumb: 'Management' },
  },
  {
    path: Pages.Faqs.add,
    component: FaqFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [FaqGuard],
    data: {
      breadcrumb: 'Add Faq',
    },
    pathMatch: 'full',
  },
  {
    path: Pages.Faqs.view,
    component: FaqFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [FaqGuard],
    data: {
      breadcrumb: 'View Faq',
    },
    pathMatch: 'full',
  },
  {
    path: Pages.Faqs.edit,
    component: FaqFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [FaqGuard],
    data: {
      breadcrumb: 'Edit Faq',
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqsRoutesModule {}

