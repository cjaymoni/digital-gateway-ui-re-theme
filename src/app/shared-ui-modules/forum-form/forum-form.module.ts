import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumFormComponent } from './forum-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagAutocompleteModule } from '../tag-autocomplete/tag-autocomplete.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { AppHeadingModule } from '../app-heading/app-heading.module';
@NgModule({
  declarations: [ForumFormComponent],
  imports: [
    CommonModule,
    AppQuillModule,
    InputTextModule,
    TagAutocompleteModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    InputTextareaModule,
    ErrorTailorModule,
    AppHeadingModule,
  ],
  exports: [ForumFormComponent],
})
export class ForumFormModule {}

