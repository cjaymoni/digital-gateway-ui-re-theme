import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { trackByAny, trackById } from 'src/app/config/app-config';
import { DeviceService } from 'src/app/services/device.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

enum PlayStatus {
  PLAY = 1,
  PAUSE = 2,
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private _multimediaSlider!: Carousel;

  @ViewChild('multimediaSlider', { static: false })
  set multimediaSlider(tempRef: Carousel) {
    if (isPlatformBrowser(this.platform) && tempRef) {
      this._multimediaSlider = tempRef;
    }
  }

  trackBy = trackById;
  trackAny = trackByAny;

  multimedia$ = this.themeStore.featuredMultimedia$;
  highlights$ = this.themeStore.highlightArticlesArray$;
  featuredArticles$ = this.themeStore.featuredArticlesArray$;
  featuredOpportunities$ = this.themeStore.featuredEventsArray$;
  directLinks$ = this.themeStore.featuredDirectLinks$;
  featuredCategories$ = this.themeStore.featuredCatgories$;

  isHandheld$ = this.device.isHandheld$;

  constructor(
    private themeStore: ThemeSettingsStore,
    private device: DeviceService,
    @Inject(PLATFORM_ID) private platform: any,
    private gtag: GoogleAnalyticsService
  ) {
    this.gtag.Pages.homepageOpened();
  }

  ngOnInit() {}

  videoStatusChange(event: any) {
    if (event.data === PlayStatus.PLAY) {
      this.gtag.Events.playMultimedia();
      this._multimediaSlider.stopAutoplay();
    } else if (event.data === PlayStatus.PAUSE) {
      this._multimediaSlider.startAutoplay();
    }
  }
}
