import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { CategoryAutocompleteModule } from '../category-autocomplete/category-autocomplete.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { CategoryFormComponent } from './category-form.component';

@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryAutocompleteModule,
    ImageUploadModule,
    ButtonModule,
    RippleModule,
    InputTextareaModule,
    InputTextModule,
  ],
  exports: [CategoryFormComponent],
})
export class CategoryFormModule {}
