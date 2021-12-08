import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() commentCount = 0;

  @Output() commentsClickedEvent = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  commentsClicked() {
    this.commentsClickedEvent.emit();
  }
}
