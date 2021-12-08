import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsOfCommentsComponent } from './comments-of-comments.component';
import { CommentCardModule } from 'src/app/shared-ui-modules/comment-card/comment-card.module';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [CommentsOfCommentsComponent],
  imports: [CommonModule, CommentCardModule, DividerModule],
  exports: [CommentsOfCommentsComponent],
})
export class CommentsOfCommentsModule {}
