import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutesModule } from './login-routes.module';
import { LoginFormModule } from './login-form/login-form.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModule,
    LoginFormModule,
  ],
  declarations: []
})
export class LoginModule { }
