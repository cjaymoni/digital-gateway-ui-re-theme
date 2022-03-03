import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyArticlesListComponent } from './my-articles-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [MyArticlesListComponent],
  imports: [
    CommonModule,
    AppTableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    TagModule,
    MenuModule,
    DirectivesModule,
  ],
  exports: [MyArticlesListComponent],
})
export class MyArticlesListModule {}
