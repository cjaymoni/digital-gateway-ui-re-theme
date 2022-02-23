import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LoginButtonComponent],
  imports: [CommonModule, ButtonModule, MenuModule],
  exports: [LoginButtonComponent],
})
export class LoginButtonModule {}
