import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenedForumPostCardComponent } from './opened-forum-post-card.component';
import { CommentsModule } from '../comments/comments.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { VotesModule } from '../votes/votes.module';
import { CommentCardModule } from '../comment-card/comment-card.module';

@NgModule({
  imports: [
    CommonModule,
    CommentsModule,
    CommentFormModule,
    CommentCardModule,
    VotesModule,
  ],
  declarations: [OpenedForumPostCardComponent],
  exports: [OpenedForumPostCardComponent],
})
export class OpenedForumPostCardModule {}
