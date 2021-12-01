import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenedForumCardComponent } from './opened-forum-card.component';
import { VotesModule } from '../votes/votes.module';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { CommentCardModule } from '../comment-card/comment-card.module';

@NgModule({
  imports: [
    CommonModule,
    VotesModule,
    CardModule,
    SkeletonModule,
    ButtonModule,
    CommentCardModule,
  ],
  declarations: [OpenedForumCardComponent],
  exports: [OpenedForumCardComponent],
})
export class OpenedForumCardModule {}
