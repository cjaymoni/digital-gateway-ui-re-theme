import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent],
})
export class CommentFormModule {}
