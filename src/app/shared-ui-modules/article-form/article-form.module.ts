import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { CategoryAutocompleteModule } from '../category-autocomplete/category-autocomplete.module';
import { TagAutocompleteModule } from '../tag-autocomplete/tag-autocomplete.module';
import { ArticleFormComponent } from './article-form.component';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AppQuillModule,
    TagAutocompleteModule,
    CategoryAutocompleteModule,
    ButtonModule,
  ],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
