import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPlaceRoutingModule } from './market-place-routing.module';
import { MarketPlaceListModule } from './market-place-list/market-place-list.module';
import { MarketPostFormModule } from './market-post-form/market-post-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarketPlaceRoutingModule,
    MarketPlaceListModule,
    MarketPostFormModule,
  ],
})
export class MarketPlaceModule {}
