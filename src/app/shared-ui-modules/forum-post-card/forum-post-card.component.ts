import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forum-post-card',
  templateUrl: './forum-post-card.component.html',
  styleUrls: ['./forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumPostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
