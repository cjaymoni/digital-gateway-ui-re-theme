import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Forum } from 'src/app/models/forum.model';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from '../../store/actions/forum.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forum-post-card',
  templateUrl: './forum-post-card.component.html',
  styleUrls: ['./forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostCardComponent implements OnInit {
  @Input() forumPost: any;
  showCommentForm: boolean = false;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  openForum() {
    this.navigator.forum.goToViewDetailsPage(this.forumPost?.name as string);
  }

  dislikeForum() {}
  likeForum() {}
  show() {
    this.showCommentForm = !this.showCommentForm;
  }
}
