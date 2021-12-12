import { EventsSettingsComponent } from '../events-settings/events-settings.component';
import { FeaturedCategorySettingsComponent } from '../featured-category-settings/featured-category-settings.component';
import { MarketAdsSettingsComponent } from '../market-ads-settings/market-ads-settings.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { HighlightsSettingsComponent } from '../highlights-settings/highlights-settings.component';

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
        header: 'Available Featured Category',
        content: FeaturedCategorySettingsComponent,
      },
      {
        header: 'Available HighLights',
        content: HighlightsSettingsComponent,
      },
      {
        header: 'Available Events',
        content: EventsSettingsComponent,
      },
      {
        header: 'Available MarketAds',
        content: MarketAdsSettingsComponent,
      },
    ];
  }
}