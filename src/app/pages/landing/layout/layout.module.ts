import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';
import { ForumCardModule } from 'src/app/shared-ui-modules/forum-card/forum-card.module';
import { OpportunitisCardModule } from 'src/app/shared-ui-modules/opportunitis-card/opportunitis-card.module';
import { RightNavCardModule } from 'src/app/shared-ui-modules/right-nav-card/right-nav-card.module';
import { DirectLinksCardModule } from '../../../shared-ui-modules/direct-links-card/direct-links-card.module';
import { FeaturedCategoriesCardModule } from '../../../shared-ui-modules/featured-categories-card/featured-categories-card.module';
import { MarketCardModule } from '../../market-place/market-card/market-card.module';
import { MultimediaModule } from '../multimedia/multimedia.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ArticleCardModule,
    MarketCardModule,
    RightNavCardModule,
    ForumCardModule,
    CardModule,
    MultimediaModule,
    DirectLinksCardModule,
    FeaturedCategoriesCardModule,
    OpportunitisCardModule,
    DirectivesModule,
    SkeletonModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
