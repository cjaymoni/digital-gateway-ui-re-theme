import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaComponent implements OnInit {
  player!: YT.Player;

  @Input() videoId = '4gBpIi-gXhc';

  constructor() {}

  ngOnInit() {}

  savePlayer(player: YT.Player) {
    this.player = player;
  }
}
