import { EventsSettingsComponent } from '../events-settings/events-settings.component';
import { FeaturedCategorySettingsComponent } from '../featured-category-settings/featured-category-settings.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { HighlightsSettingsComponent } from '../highlights-settings/highlights-settings.component';
import { FeaturedArticlesSettingsComponent } from '../featured-articles-settings/featured-articles-settings.component';
import { SocialMediaSettingsComponent } from '../social-media-settings/social-media-settings.component';
import { FaqSettingsComponent } from '../faq-settings/faq-settings.component';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent implements OnInit {
  tabItems: any[] = [];
  constructor() {}

  ngOnInit() {
    this.tabItems = [
      {
        header: 'Featured Category',
        content: FeaturedCategorySettingsComponent,
      },
      {
        header: 'HighLights',
        content: HighlightsSettingsComponent,
      },
      {
        header: 'Current Opportunities',
        content: EventsSettingsComponent,
      },
      {
        header: 'Featured Articles',
        content: FeaturedArticlesSettingsComponent,
      },
      {
        header: 'Social Media',
        content: SocialMediaSettingsComponent,
      },
      {
        header: 'FAQs',
        content: FaqSettingsComponent,
      },
    ];
  }
}

