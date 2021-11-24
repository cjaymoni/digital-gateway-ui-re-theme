import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule

  ],
  declarations: [CommentsComponent],
  exports:[CommentsComponent]
})
export class CommentsModule { }
