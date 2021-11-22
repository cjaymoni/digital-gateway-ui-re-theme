import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppBootstrap } from './services/app.bootstrap';
import { DeviceService } from './services/device.service';
import { articleActions } from './store/actions/article.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MSME-UI';

  isHandheld$ = this.device.isHandheld$;

  /**
   *
   */
  constructor(
    private device: DeviceService,
    private appBootstrap: AppBootstrap
  ) {
    this.appBootstrap.initializeAppData();
  }
}
