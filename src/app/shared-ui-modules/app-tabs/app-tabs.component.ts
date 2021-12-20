import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTabsComponent implements OnInit {
  @Input() tabItems: any[] = [];
  constructor() {}

  ngOnInit() {}
}
