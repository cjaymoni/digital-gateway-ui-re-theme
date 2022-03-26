import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageModule } from './users-list-page/users-list-page.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersFormModule } from 'src/app/shared-ui-modules/users-form/users-form.module';

@NgModule({
  imports: [
    CommonModule,
    UsersListPageModule,
    UserManagementRoutingModule,
    UsersFormModule,
  ],
})
export class UsersManagementModule {}
