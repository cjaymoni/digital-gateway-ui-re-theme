import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPostCardComponent } from './forum-post-card.component';
import { CardModule } from 'primeng/card';
import { CommentsModule } from '../comments/comments.module';
import { VotesModule } from '../votes/votes.module';
import { ButtonModule } from 'primeng/button';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { CommentCardModule } from '../comment-card/comment-card.module';
import { AvatarModule } from 'primeng/avatar';
@NgModule({
  declarations: [ForumPostCardComponent],
  imports: [
    CommonModule,
    CardModule,
    CommentsModule,
    VotesModule,
    ButtonModule,
    AppPipesModule,
    CommentFormModule,
    CommentCardModule,
    AvatarModule,
  ],
  exports: [ForumPostCardComponent],
})
export class ForumPostCardModule {}
