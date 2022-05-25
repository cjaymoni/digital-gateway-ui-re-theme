import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginFormComponent } from './login-form.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DirectivesModule,
    ErrorTailorModule,
  ],
  exports: [LoginFormComponent],
  declarations: [LoginFormComponent],
})
export class LoginFormModule {}
