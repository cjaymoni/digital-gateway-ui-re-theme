import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsRoutesModule } from './app-settings-routing.module';
import { SettingsViewModule } from './pages/settings-view/settings-view.module';
import { EventsSettingsModule } from './pages/events-settings/events-settings.module';
import { FeaturedCategorySettingsModule } from './pages/featured-category-settings/featured-category-settings.module';
import { HighlightsSettingsModule } from './pages/highlights-settings/highlights-settings.module';
import { FeaturedArticlesSettingsModule } from './pages/featured-articles-settings/featured-articles-settings.module';
import { SocialMediaSettingsModule } from './pages/social-media-settings/social-media-settings.module';
import { SocialMediaFormModule } from './pages/social-media-settings/social-media-form/social-media-form.module';

@NgModule({
  imports: [
    CommonModule,
    AppSettingsRoutesModule,
    SettingsViewModule,
    EventsSettingsModule,
    FeaturedCategorySettingsModule,
    HighlightsSettingsModule,
    FeaturedArticlesSettingsModule,
    SocialMediaSettingsModule,
    SocialMediaFormModule,
  ],
})
export class AppSettingsModule {}
