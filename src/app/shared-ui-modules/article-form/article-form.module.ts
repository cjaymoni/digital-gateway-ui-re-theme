import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleFormComponent } from './article-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AppQuillModule,
    AppAutoCompleteModule,
    ButtonModule,
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule { }
