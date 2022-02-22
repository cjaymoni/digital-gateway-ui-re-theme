import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-direct-links-card',
  templateUrl: './direct-links-card.component.html',
  styleUrls: ['./direct-links-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectLinksCardComponent implements OnInit {
  @Input() digiLink: any;

  constructor() {}

  ngOnInit() {}
}
