import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPlaceListComponent } from './market-place-list.component';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { MarketCardModule } from 'src/app/pages/market-place/market-card/market-card.module';

@NgModule({
  declarations: [MarketPlaceListComponent],
  imports: [CommonModule, ListingPageModule, MarketCardModule],
  exports: [MarketPlaceListComponent],
})
export class MarketPlaceListModule {}
