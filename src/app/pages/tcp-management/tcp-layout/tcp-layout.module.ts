import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TcpLayoutComponent } from './tcp-layout.component';
import { TcpFormModule } from 'src/app/shared-ui-modules/tcp-form/tcp-form.module';

@NgModule({
  imports: [
    CommonModule,
    TcpFormModule,
  ],
  exports: [TcpLayoutComponent],
  declarations: [TcpLayoutComponent]
})
export class TcpLayoutModule { }
