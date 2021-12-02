import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { ContentManagementListPageModule } from './content-management-list-page/content-management-list-page.module';

@NgModule({
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    ContentManagementListPageModule,
  ],
  exports: [],
  declarations: [],
})
export class ContentManagementModule {}
