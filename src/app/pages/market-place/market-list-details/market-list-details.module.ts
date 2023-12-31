import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketListDetailsComponent } from './market-list-details.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { ForumLoadingCardModule } from 'src/app/shared-ui-modules/forum-loading-card/forum-loading-card.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { AppHeadingModule } from 'src/app/shared-ui-modules/app-heading/app-heading.module';
import { AppPipesModule } from 'src/app/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    ImageModule,
    SkeletonModule,
    GalleriaModule,
    ImageModule,
    TagModule,
    MessageModule,
    ButtonModule,
    InplaceModule,
    ForumLoadingCardModule,
    DirectivesModule,
    AppHeadingModule,
    AppPipesModule,
  ],
  exports: [MarketListDetailsComponent],
  declarations: [MarketListDetailsComponent],
})
export class MarketListDetailsModule {}

