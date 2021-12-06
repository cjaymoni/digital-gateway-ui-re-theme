import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent implements OnInit {
  @Input() disableLike = false;
  @Input() disableDislike = false;

  @Output() likeClickEvent = new EventEmitter();
  @Output() dislikeClickEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  like() {
    this.likeClickEvent.emit();
  }

  dislike() {
    this.dislikeClickEvent.emit();
  }
}
