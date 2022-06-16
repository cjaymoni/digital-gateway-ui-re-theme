import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangeComponent } from './password-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  declarations: [PasswordChangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ErrorTailorModule,
  ],
})
export class PasswordChangeModule {}

