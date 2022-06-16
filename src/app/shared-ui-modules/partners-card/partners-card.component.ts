import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-partners-card',
  templateUrl: './partners-card.component.html',
  styleUrls: ['./partners-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnersCardComponent implements OnInit {
  @Input()
  partner: any;
  constructor() {}

  ngOnInit() {}
}

