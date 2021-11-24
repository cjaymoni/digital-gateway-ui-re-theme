import { Component } from '@angular/core';
import { AppBootstrap } from './services/app.bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MSME-UI';

  constructor(private appBootstrap: AppBootstrap) {
    this.appBootstrap.initializeAppData();
  }
}
