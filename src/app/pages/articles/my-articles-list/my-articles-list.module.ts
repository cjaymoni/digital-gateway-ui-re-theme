import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyArticlesListComponent } from './my-articles-list.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [MyArticlesListComponent],
  imports: [CommonModule, AppTableModule, ButtonModule, TooltipModule],
})
export class MyArticlesListModule {}
