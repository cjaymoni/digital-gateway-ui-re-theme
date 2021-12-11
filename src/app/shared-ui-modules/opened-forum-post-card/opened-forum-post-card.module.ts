import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenedForumPostCardComponent } from './opened-forum-post-card.component';
import { CommentsModule } from '../comments/comments.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { VotesModule } from '../votes/votes.module';
import { CommentCardModule } from '../comment-card/comment-card.module';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { ForumLoadingCardModule } from '../forum-loading-card/forum-loading-card.module';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  imports: [
    CommonModule,
    CommentsModule,
    CommentFormModule,
    CommentCardModule,
    VotesModule,
    ButtonModule,
    AvatarModule,
    ImageModule,
    ForumLoadingCardModule,
    GalleriaModule,
  ],
  declarations: [OpenedForumPostCardComponent],
  exports: [OpenedForumPostCardComponent],
})
export class OpenedForumPostCardModule {}
