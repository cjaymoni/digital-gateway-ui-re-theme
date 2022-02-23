import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageModule } from './users-list-page/users-list-page.module';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
  imports: [CommonModule, UsersListPageModule, UserManagementRoutingModule],
})
export class UsersManagementModule {}
