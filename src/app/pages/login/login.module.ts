import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutesModule } from './login-routes.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutesModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
