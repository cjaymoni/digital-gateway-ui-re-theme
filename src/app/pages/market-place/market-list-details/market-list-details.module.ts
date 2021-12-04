import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketListDetailsComponent } from './market-list-details.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    ImageModule,
    SkeletonModule,
  ],
  exports: [MarketListDetailsComponent],
  declarations: [MarketListDetailsComponent]
})
export class MarketListDetailsModule { }
