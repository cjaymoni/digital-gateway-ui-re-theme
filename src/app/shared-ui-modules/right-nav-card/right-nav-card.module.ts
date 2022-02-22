import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightNavCard } from './right-nav-card.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ArticleImageModule } from '../article-image/article-image.module';
import { FeaturedArticleCardModule } from '../featured-article-card/featured-article-card.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    FeaturedArticleCardModule,
    ArticleImageModule,
  ],
  declarations: [RightNavCard],
  exports: [RightNavCard],
})
export class RightNavCardModule {}
