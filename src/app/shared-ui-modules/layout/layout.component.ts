import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlets } from 'src/app/config/app-config';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThemeSettingsStore],
})
export class LayoutComponent implements OnInit {
  RouterOutlets = RouterOutlets;

  constructor() {}

  ngOnInit(): void {}
}
