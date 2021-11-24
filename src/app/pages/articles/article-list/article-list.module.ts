import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';
import { ArticleListComponent } from './article-list.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [CommonModule, ArticleCardModule, SkeletonModule],
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
