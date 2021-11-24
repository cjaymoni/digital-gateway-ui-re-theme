import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
