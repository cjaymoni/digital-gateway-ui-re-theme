import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
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

  @Input() avatar: any;

  constructor(
    private navigator: NavigatorService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  openForumPost() {
    this.navigator.forum.goToReadForumPost(
      this.forumPost?.title as string,
      this.forumPost?.id
    );
  }

  dislikeForum() {}
  likeForum() {}
}
