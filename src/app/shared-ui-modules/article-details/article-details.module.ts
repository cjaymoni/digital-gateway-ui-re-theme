import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [CommonModule, SkeletonModule],
  declarations: [ArticleDetailsComponent],
})
export class ArticleDetailsModule {}
