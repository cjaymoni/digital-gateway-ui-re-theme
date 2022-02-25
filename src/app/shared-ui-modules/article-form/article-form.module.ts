import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { CategoryAutocompleteModule } from '../category-autocomplete/category-autocomplete.module';
import { ImageUploadModule } from '../image-upload/image-upload.module';
import { TagAutocompleteModule } from '../tag-autocomplete/tag-autocomplete.module';
import { ArticleFormComponent } from './article-form.component';
import { DirectivesModule } from './../../directives/directives.module';
import { ErrorTailorModule } from '@ngneat/error-tailor';

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
    ImageUploadModule,
    TooltipModule,
    DirectivesModule,
    ErrorTailorModule,
  ],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
