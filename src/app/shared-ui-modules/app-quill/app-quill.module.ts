import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppQuillComponent } from './app-quill.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  declarations: [AppQuillComponent],
  exports: [AppQuillComponent],
})
export class AppQuillModule {}
