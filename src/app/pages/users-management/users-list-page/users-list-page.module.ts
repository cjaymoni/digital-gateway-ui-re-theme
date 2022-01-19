import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageComponent } from './users-list-page.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, AppTableModule, MenuModule, ButtonModule],
  declarations: [UsersListPageComponent],
  exports: [UsersListPageComponent],
})
export class UsersListPageModule {}
