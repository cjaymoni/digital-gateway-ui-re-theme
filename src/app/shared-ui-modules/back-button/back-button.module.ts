import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [CommonModule, ButtonModule],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
