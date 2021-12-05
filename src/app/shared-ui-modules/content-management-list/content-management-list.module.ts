import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagementListComponent } from './content-management-list.component';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrderListModule,
    ButtonModule,
    ListboxModule,
    TooltipModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ContentManagementListComponent],
  declarations: [ContentManagementListComponent],
})
export class ContentManagementListModule {}
