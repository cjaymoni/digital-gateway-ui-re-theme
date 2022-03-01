import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [LoginButtonComponent],
  imports: [CommonModule, ButtonModule, MenuModule, DirectivesModule],
  exports: [LoginButtonComponent],
})
export class LoginButtonModule {}
