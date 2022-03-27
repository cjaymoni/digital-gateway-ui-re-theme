import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageComponent } from './users-list-page.component';
import { AppTableModule } from 'src/app/shared-ui-modules/app-table/app-table.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    AppTableModule,
    MessageModule,
    AppPipesModule,
    MenuModule,
    ButtonModule,
  ],
  declarations: [UsersListPageComponent],
  exports: [UsersListPageComponent],
})
export class UsersListPageModule {}
