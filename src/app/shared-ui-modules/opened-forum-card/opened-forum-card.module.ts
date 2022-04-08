import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppPipesModule } from '../../pipes/app-pipes.module';
import { AppHeadingModule } from '../app-heading/app-heading.module';
import { ForumLoadingCardModule } from '../forum-loading-card/forum-loading-card.module';
import { ForumPostCardModule } from '../forum-post-card/forum-post-card.module';
import { OpenedForumCardComponent } from './opened-forum-card.component';

@NgModule({
  imports: [
    CommonModule,
    ForumLoadingCardModule,
    ButtonModule,
    ForumPostCardModule,
    AppPipesModule,
    DirectivesModule,
    AppHeadingModule,
  ],

  declarations: [OpenedForumCardComponent],
  exports: [OpenedForumCardComponent],
})
export class OpenedForumCardModule {}

