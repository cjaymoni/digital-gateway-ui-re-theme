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
  ],
  exports: [MarketListDetailsComponent],
  declarations: [MarketListDetailsComponent],
})
export class MarketListDetailsModule {}
