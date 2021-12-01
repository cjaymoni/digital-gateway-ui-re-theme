import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPostCardComponent } from './forum-post-card.component';
import { CardModule } from 'primeng/card';
import { CommentsModule } from '../comments/comments.module';
import { VotesModule } from '../votes/votes.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ForumPostCardComponent],
  imports: [
    CommonModule,
    CardModule,
    CommentsModule,
    VotesModule,
    ButtonModule,
  ],
  exports: [ForumPostCardComponent],
})
export class ForumPostCardModule {}
