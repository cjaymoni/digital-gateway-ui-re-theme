import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumFormComponent } from './forum-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { AppQuillModule } from '../app-quill/app-quill.module';
import { AppAutoCompleteModule } from '../app-auto-complete/app-auto-complete.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ForumFormComponent],
  imports: [
    CommonModule,
    AppQuillModule,
    InputTextModule,
    AppAutoCompleteModule,
    ButtonModule
  ],
  exports:[ForumFormComponent]
})
export class ForumFormModule { }
