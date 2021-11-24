import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
