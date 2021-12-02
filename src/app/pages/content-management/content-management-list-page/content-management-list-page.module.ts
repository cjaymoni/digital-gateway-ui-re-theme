import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementListPageComponent } from './content-management-list-page.component';
import { ContentManagementListModule } from 'src/app/shared-ui-modules/content-management-list/content-management-list.module';

@NgModule({
  imports: [CommonModule, ContentManagementListModule],
  exports: [ContentManagementListPageComponent],
  declarations: [ContentManagementListPageComponent],
})
export class ContentManagementListPageModule {}
