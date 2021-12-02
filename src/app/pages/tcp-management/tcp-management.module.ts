import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcpManagementRoutingModule } from './tcp-management-routing.module';
import { TcpLayoutModule } from './tcp-layout/tcp-layout.module';

@NgModule({
  imports: [
    CommonModule,
    TcpManagementRoutingModule,
    TcpLayoutModule,
  ],
  exports: [],
  declarations: []
})
export class TcpManagementModule { }
