import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MultiMedia } from 'src/app/models/multimedia.model';

let apiLoaded = false;
@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaComponent implements OnInit {
  player!: YT.Player;

  videoId = '';

  @Input() multimedia: MultiMedia | null = null;

  constructor() {}

  ngOnInit() {
    const indexOfEqualSign = this.multimedia?.url.indexOf('=') || -1;
    const indexOfAmpersand =
      this.multimedia?.url.indexOf('&', indexOfEqualSign) || -1;

    this.videoId = this.multimedia?.url.slice(
      indexOfEqualSign > -1 ? indexOfEqualSign + 1 : undefined,
      indexOfAmpersand > -1 ? indexOfAmpersand : undefined
    ) as string;

    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }
}
