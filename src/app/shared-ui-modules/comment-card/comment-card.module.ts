import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from './comment-card.component';
import { VotesModule } from '../votes/votes.module';
import { AppPipesModule } from '../../pipes/app-pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
import { CommentsModule } from '../comments/comments.module';
import { ButtonModule } from 'primeng/button';
import { CommentFormModule } from '../comment-form/comment-form.module';

@NgModule({
  declarations: [CommentCardComponent],
  imports: [
    CommonModule,
    VotesModule,
    CommentsModule,
    AppPipesModule,
    DirectivesModule,
    ButtonModule,
    CommentFormModule,
  ],
  exports: [CommentCardComponent],
})
export class CommentCardModule {}
