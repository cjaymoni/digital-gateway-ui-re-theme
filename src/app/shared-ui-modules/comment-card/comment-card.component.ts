import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
