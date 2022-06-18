import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsFormComponent } from './contact-us-form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ErrorTailorModule,
  ],
  declarations: [ContactUsFormComponent],
})
export class ContactUsFormModule {}

