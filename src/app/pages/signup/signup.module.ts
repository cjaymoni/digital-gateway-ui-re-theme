import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormModule } from './signup-form/signup-form.module';

@NgModule({
  imports: [CommonModule, SignupFormModule],
})
export class SignupModule {}
