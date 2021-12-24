import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentManagementListPageComponent } from './content-management-list-page.component';
import { ContentManagementListModule } from 'src/app/shared-ui-modules/content-management-list/content-management-list.module';
import { CategoryAutocompleteModule } from 'src/app/shared-ui-modules/category-autocomplete/category-autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    ContentManagementListModule,
    CategoryAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ContentManagementListPageComponent],
  declarations: [ContentManagementListPageComponent],
})
export class ContentManagementListPageModule {}
