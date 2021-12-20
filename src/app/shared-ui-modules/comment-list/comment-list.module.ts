import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list.component';
import { CommentCardModule } from '../comment-card/comment-card.module';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [CommentListComponent],
  imports: [CommonModule, CommentCardModule, DividerModule],
})
export class CommentListModule {}
