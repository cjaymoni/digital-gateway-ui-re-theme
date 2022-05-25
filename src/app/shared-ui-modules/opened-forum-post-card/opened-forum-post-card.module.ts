import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppHeadingModule } from '../app-heading/app-heading.module';
import { CommentCardModule } from '../comment-card/comment-card.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { CommentsModule } from '../comments/comments.module';
import { ForumLoadingCardModule } from '../forum-loading-card/forum-loading-card.module';
import { VotesModule } from '../votes/votes.module';
import { OpenedForumPostCardComponent } from './opened-forum-post-card.component';

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
    DirectivesModule,
    AppHeadingModule,
  ],
  declarations: [OpenedForumPostCardComponent],
  exports: [OpenedForumPostCardComponent],
})
export class OpenedForumPostCardModule {}

