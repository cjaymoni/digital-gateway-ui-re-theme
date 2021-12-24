import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumCardComponent } from './forum-card.component';
import { VotesModule } from '../votes/votes.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    CommentsModule,
    VotesModule,
    ButtonModule,
    AppPipesModule,
  ],
  declarations: [ForumCardComponent],
  exports: [ForumCardComponent],
})
export class ForumCardModule {}
