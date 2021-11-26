import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ArticleImageModule } from '../article-image/article-image.module';
import { TagModule } from 'primeng/tag';

@NgModule({
  imports: [CommonModule, SkeletonModule, ArticleImageModule, TagModule],
  declarations: [ArticleDetailsComponent],
  exports: [ArticleDetailsComponent],
})
export class ArticleDetailsModule {}
