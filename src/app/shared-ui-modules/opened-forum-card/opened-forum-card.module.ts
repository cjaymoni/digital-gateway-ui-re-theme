import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenedForumCardComponent } from './opened-forum-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ForumPostCardModule } from '../forum-post-card/forum-post-card.module';
import { AppPipesModule } from '../../pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    SkeletonModule,
    ButtonModule,
    ForumPostCardModule,
    AppPipesModule,
  ],

  declarations: [OpenedForumCardComponent],
  exports: [OpenedForumCardComponent],
})
export class OpenedForumCardModule {}
