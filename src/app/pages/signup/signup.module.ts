import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormModule } from './signup-form/signup-form.module';
import { SignupRoutesModule } from './signup-routes.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SignupFormModule,
    SignupRoutesModule,
    HttpClientModule,
  ],
})
export class SignupModule {}
