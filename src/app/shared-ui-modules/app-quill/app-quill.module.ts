import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppQuillComponent } from './app-quill.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  declarations: [AppQuillComponent],
  exports:[AppQuillComponent]
})
export class AppQuillModule { }
