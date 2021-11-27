import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PrimeNgAlerts, RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from '../alerts/service/app-alert.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  RouterOutlets = RouterOutlets;

  constructor() {}

  ngOnInit(): void {}
}
