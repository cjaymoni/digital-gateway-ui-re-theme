import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketAdsSettingsComponent } from './market-ads-settings.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, PickListModule, ButtonModule],
  declarations: [MarketAdsSettingsComponent],
  exports: [MarketAdsSettingsComponent],
})
export class MarketAdsSettingsModule {}
