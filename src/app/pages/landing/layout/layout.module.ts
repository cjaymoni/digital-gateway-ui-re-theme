import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CarouselModule } from 'primeng/carousel';
import { ArticleCardModule } from 'src/app/shared-ui-modules/article-card/article-card.module';
import { MarketCardModule } from '../../market-place/market-card/market-card.module';
import { RightNavCardModule } from 'src/app/shared-ui-modules/right-nav-card/right-nav-card.module';
import { ForumPostCardModule } from 'src/app/shared-ui-modules/forum-post-card/forum-post-card.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    ArticleCardModule,
    MarketCardModule,
    RightNavCardModule,
    ForumPostCardModule,
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
