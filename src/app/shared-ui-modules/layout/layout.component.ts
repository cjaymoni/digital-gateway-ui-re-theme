import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  RouterOutlets = RouterOutlets;

  constructor(private navigator: NavigatorService) {}

  ngOnInit(): void {}
}
