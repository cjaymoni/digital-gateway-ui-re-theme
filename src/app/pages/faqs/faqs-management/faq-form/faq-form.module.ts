import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqFormComponent } from './faq-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppQuillModule } from 'src/app/shared-ui-modules/app-quill/app-quill.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AppQuillModule,
  ],
  declarations: [FaqFormComponent],
  exports: [FaqFormComponent],
})
export class FaqFormModule {}


