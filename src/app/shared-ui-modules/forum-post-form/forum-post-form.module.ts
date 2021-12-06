import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPostFormComponent } from './forum-post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { ForumAutocompleteModule } from '../forum-autocomplete/forum-autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    AppQuillModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ForumAutocompleteModule,
  ],
  declarations: [ForumPostFormComponent],
  exports: [ForumPostFormComponent],
})
export class ForumPostFormModule {}
