import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcpFormComponent } from './tcp-form.component';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    OrderListModule,
    ButtonModule,
  ],
  exports: [TcpFormComponent],
  declarations: [TcpFormComponent]
})
export class TcpFormModule { }
