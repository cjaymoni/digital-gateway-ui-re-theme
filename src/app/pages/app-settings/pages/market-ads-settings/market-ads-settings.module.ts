import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketAdsSettingsComponent } from './market-ads-settings.component';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  imports: [CommonModule, PickListModule],
  declarations: [MarketAdsSettingsComponent],
  exports: [MarketAdsSettingsComponent],
})
export class MarketAdsSettingsModule {}
