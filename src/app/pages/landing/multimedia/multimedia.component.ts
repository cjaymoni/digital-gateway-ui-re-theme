import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultimediaComponent implements OnInit {
  @Input() multimediaContent: {url: string, title: string} | null = null;

  constructor() { }

  ngOnInit() {
  }

}
