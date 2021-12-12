import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsRoutesModule } from './app-settings-routing.module';
import { SettingsViewModule } from './pages/settings-view/settings-view.module';
import { EventsSettingsModule } from './pages/events-settings/events-settings.module';
import { FeaturedCategorySettingsModule } from './pages/featured-category-settings/featured-category-settings.module';
import { MarketAdsSettingsModule } from './pages/market-ads-settings/market-ads-settings.module';
import { HighlightsSettingsModule } from './pages/highlights-settings/highlights-settings.module';

@NgModule({
  imports: [
    CommonModule,
    AppSettingsRoutesModule,
    SettingsViewModule,
    EventsSettingsModule,
    FeaturedCategorySettingsModule,
    MarketAdsSettingsModule,
    HighlightsSettingsModule,
  ],
})
export class AppSettingsModule {}