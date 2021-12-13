import { LOGIN_SERVICE } from './../../config/injectables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutesModule } from './login-routes.module';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginService } from './services/login.service'

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModule,
    LoginFormModule,
  ],
  declarations: [],
  providers: [
    {provide: LOGIN_SERVICE , useClass: LoginService},
  ]
})
export class LoginModule { }
