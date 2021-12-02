import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagementListPageComponent } from './content-management-list-page/content-management-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContentManagementListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentManagementRoutingModule {}
