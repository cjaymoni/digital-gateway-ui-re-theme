import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsOfCommentsComponent } from './comments-of-comments.component';
import { CommentCardModule } from 'src/app/shared-ui-modules/comment-card/comment-card.module';

@NgModule({
  declarations: [CommentsOfCommentsComponent],
  imports: [CommonModule, CommentCardModule],
  exports: [CommentsOfCommentsComponent],
})
export class CommentsOfCommentsModule {}
