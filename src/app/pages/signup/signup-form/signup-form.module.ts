import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ErrorTailorModule,
  ],
  declarations: [SignupFormComponent],
  exports: [SignupFormComponent],
})
export class SignupFormModule {}
