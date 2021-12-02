import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forum-post-details',
  templateUrl: './forum-post-details.component.html',
  styleUrls: ['./forum-post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumPostDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
