import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPostDetailsComponent } from './forum-post-details.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { CommentCardModule } from '../comment-card/comment-card.module';
import { CommentsModule } from '../comments/comments.module';
import { AppPipesModule } from '../../pipes/app-pipes.module';
import { VotesModule } from '../votes/votes.module';
import { CommentFormModule } from '../comment-form/comment-form.module';
import { OpenedForumPostCardModule } from '../opened-forum-post-card/opened-forum-post-card.module';

@NgModule({
  imports: [CommonModule, OpenedForumPostCardModule],
  declarations: [ForumPostDetailsComponent],
  exports: [ForumPostDetailsComponent],
})
export class ForumPostDetailsModule {}
