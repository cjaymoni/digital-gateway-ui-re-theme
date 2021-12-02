import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tcp-layout',
  templateUrl: './tcp-layout.component.html',
  styleUrls: ['./tcp-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcpLayoutComponent implements OnInit {

  products: any = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'},
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
