import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { ContentManagementListPageModule } from './content-management-list-page/content-management-list-page.module';
import { CategoryFormModule } from 'src/app/shared-ui-modules/category-form/category-form.module';

@NgModule({
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    ContentManagementListPageModule,
    CategoryFormModule,
  ],
  exports: [],
  declarations: [],
})
export class ContentManagementModule {}
