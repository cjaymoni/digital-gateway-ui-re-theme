import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SeoService } from './helpers/seo.service';
import { AppBootstrap } from './services/app.bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'MSME Gateway';

  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(
    private appBootstrap: AppBootstrap,
    @Inject(PLATFORM_ID) private platformId: any,
    private seo: SeoService
  ) {
    this.appBootstrap.initializeAppData();
    AppComponent.isBrowser.next(isPlatformBrowser(this.platformId));
    this.seo.generateTags({
      title: 'MSME Gateway',
      description:
        'This is a website that furnishes MSME with the needed information to grow',
    });
  }

  ngAfterViewInit(): void {
    this.appBootstrap.initializeLogin();
  }
}
