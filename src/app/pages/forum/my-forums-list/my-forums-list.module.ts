import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyForumsListComponent } from './my-forums-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    TagModule,
  ],
  declarations: [MyForumsListComponent],
  exports: [MyForumsListComponent],
})
export class MyForumsListModule {}
