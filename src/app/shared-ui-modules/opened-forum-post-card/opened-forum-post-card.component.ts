import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-opened-forum-post-card',
  templateUrl: './opened-forum-post-card.component.html',
  styleUrls: ['./opened-forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenedForumPostCardComponent implements OnInit {
  showCommentForm: boolean = false;
  @Input() forumPost: any;
  constructor(public domSanitizer: DomSanitizer) {}

  ngOnInit() {}

  show() {
    this.showCommentForm = !this.showCommentForm;
  }
}
