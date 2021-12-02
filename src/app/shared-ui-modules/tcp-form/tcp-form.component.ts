import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tcp-form',
  templateUrl: './tcp-form.component.html',
  styleUrls: ['./tcp-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TcpFormComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  availableList: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
