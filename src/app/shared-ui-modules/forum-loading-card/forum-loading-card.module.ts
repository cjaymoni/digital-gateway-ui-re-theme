import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumLoadingCardComponent } from './forum-loading-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [ForumLoadingCardComponent],
  imports: [CommonModule, SkeletonModule],
  exports: [ForumLoadingCardComponent],
})
export class ForumLoadingCardModule {}
