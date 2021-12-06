import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, InputTextareaModule, ButtonModule],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent],
})
export class CommentFormModule {}
