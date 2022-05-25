import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { BehaviorSubject, Subject } from 'rxjs';
import { MultiMedia } from 'src/app/models/multimedia.model';
import { YoutubeResponse, YoutubeService } from './youtube.service';

let apiLoaded = false;
@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultimediaComponent implements OnInit {
  @ViewChild('playerRef', { static: false })
  playerRef: YouTubePlayer | undefined;

  player!: YT.Player;

  videoId = '';

  watchVideo = false;

  videoData: YoutubeResponse | undefined;

  @Input() multimedia: MultiMedia | null = null;

  @Output() playerStatus = new EventEmitter();

  loading$ = new BehaviorSubject(false);

  constructor(
    private readonly youtubeService: YoutubeService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const indexOfEqualSign = this.multimedia?.url.indexOf('=') || -1;
    const indexOfAmpersand =
      this.multimedia?.url.indexOf('&', indexOfEqualSign) || -1;

    this.videoId = this.multimedia?.url.slice(
      indexOfEqualSign > -1 ? indexOfEqualSign + 1 : undefined,
      indexOfAmpersand > -1 ? indexOfAmpersand : undefined
    ) as string;

    this.youtubeService.getData(this.videoId).subscribe(d => {
      this.videoData = d;
      this.cdref.detectChanges();
    });
  }

  stateChange(event: any) {
    this.playerStatus.emit(event);
  }

  loadVideo() {
    this.playerStatus.emit(1);
    this.loading$.next(true);
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
      this.watchVideo = true;
    }
  }

  videoReadyFn() {
    this.loading$.next(false);
  }
}

