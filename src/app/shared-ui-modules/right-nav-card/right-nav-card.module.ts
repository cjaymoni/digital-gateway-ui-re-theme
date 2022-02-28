import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightNavCard } from './right-nav-card.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ArticleImageModule } from '../article-image/article-image.module';
import { MultimediaModule } from 'src/app/pages/landing/multimedia/multimedia.module';
import { ButtonModule } from 'primeng/button';
import { FeaturedArticleCardModule } from '../featured-article-card/featured-article-card.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ArticleImageModule,
    MultimediaModule,
    ButtonModule,
    FeaturedArticleCardModule,
    SkeletonModule,
    DirectivesModule,
  ],
  declarations: [RightNavCard],
  exports: [RightNavCard],
})
export class RightNavCardModule {}
