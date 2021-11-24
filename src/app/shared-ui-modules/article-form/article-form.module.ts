import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleFormComponent } from './article-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule { }
