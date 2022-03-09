import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SeoService } from 'src/app/helpers/seo.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us-view',
  templateUrl: './about-us-view.component.html',
  styleUrls: ['./about-us-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsViewComponent implements OnInit {
  sideImage =
    'https://www.westend61.de/images/0000706025pw/close-up-of-man-using-laptop-next-to-construction-plan-at-desk-UUF006373.jpg';

  partImage = environment.APP_URL + '/assets/undp-logo.png';
  constructor(private gtag: GoogleAnalyticsService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'About MSME Gateway',
      description: 'This page gives an insight into the MSME Gateway platform',
    });

    this.gtag.Pages.aboutUsPage();
  }
}
