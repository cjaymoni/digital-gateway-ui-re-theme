import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forum-post-details',
  templateUrl: './forum-post-details.component.html',
  styleUrls: ['./forum-post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostDetailsComponent implements OnInit {
  @Input() forumPost: any | undefined;
  showCommentForm: boolean = false;

  constructor(private store: Store, public domSanitizer: DomSanitizer) {}

  ngOnInit() {}

  show() {
    this.showCommentForm = !this.showCommentForm;
  }
}
