import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyArticlesListComponent } from './my-articles-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [MyArticlesListComponent],
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    TagModule,
  ],
  exports: [MyArticlesListComponent],
})
export class MyArticlesListModule {}
