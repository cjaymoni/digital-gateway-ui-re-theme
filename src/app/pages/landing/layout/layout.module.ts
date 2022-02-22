import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';
import { MarketCardModule } from '../../market-place/market-card/market-card.module';
import { RightNavCardModule } from 'src/app/shared-ui-modules/right-nav-card/right-nav-card.module';
import { ForumCardModule } from 'src/app/shared-ui-modules/forum-card/forum-card.module';
import { MultimediaModule } from '../multimedia/multimedia.module';
import { DirectLinksCardModule } from '../../../shared-ui-modules/direct-links-card/direct-links-card.module';

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
  ],
  declarations: [LayoutComponent],
})
export class LayoutModule {}
