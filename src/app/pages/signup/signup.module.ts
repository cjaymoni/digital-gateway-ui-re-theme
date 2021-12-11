import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormModule } from './signup-form/signup-form.module';
import { SignupRoutesModule } from './signup-routes.module';

@NgModule({
  imports: [CommonModule, SignupFormModule, SignupRoutesModule],
})
export class SignupModule {}
