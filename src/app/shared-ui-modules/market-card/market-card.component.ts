import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketCardComponent implements OnInit {
  @Input() item: any = null;

  constructor() { }

  ngOnInit() {
  }

}
