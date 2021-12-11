import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forum-loading-card',
  templateUrl: './forum-loading-card.component.html',
  styleUrls: ['./forum-loading-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumLoadingCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
