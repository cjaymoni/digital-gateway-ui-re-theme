import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketPlaceListComponent } from './market-place-list.component';
import { ListingPageModule } from 'src/app/shared-ui-modules/listing-page/listing-page.module';
import { MarketCardModule } from 'src/app/pages/market-place/market-card/market-card.module';
import { ProductTypeAutocompleteModule } from 'src/app/shared-ui-modules/product-type-autocomplete/product-type-autocomplete.module';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistrictAutoCompleteModule } from 'src/app/shared-ui-modules/district-auto-complete/district-auto-complete.module';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [MarketPlaceListComponent],
  imports: [
    CommonModule,
    ListingPageModule,
    MarketCardModule,
    ProductTypeAutocompleteModule,
    SliderModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DistrictAutoCompleteModule,
    TooltipModule,
  ],
  exports: [MarketPlaceListComponent],
})
export class MarketPlaceListModule {}
