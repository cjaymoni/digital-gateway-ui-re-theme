import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CommentType } from 'src/app/config/app-config';
import { ForumsService } from 'src/app/pages/forum/services/forums.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent implements OnInit {
  @Input() disableLike = false;
  @Input() disableDislike = false;

  @Input() dislikeCount = 0;
  @Input() likeCount = 0;

  @Output() likeClickEvent = new EventEmitter();
  @Output() dislikeClickEvent = new EventEmitter();

  @Input() type: CommentType = CommentType.Comment;

  @Input() id: number = 0;

  constructor(
    private forumService: ForumsService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  like() {
    // this.likeClickEvent.emit();
    if (this.type === CommentType.Comment) {
      this.forumService.upvoteComment(this.id).subscribe(_ => {
        const _likeCount = this.likeCount + 1;
        this.likeCount = _likeCount;
        this.cdref.detectChanges();
        console.log(_likeCount);
      });
    } else {
      this.forumService.downvoteForumPost(this.id).subscribe(_ => {
        const _likeCount = this.likeCount + 1;
        this.likeCount = _likeCount;
        this.cdref.detectChanges();

        console.log(_likeCount);
      });
    }
  }

  dislike() {
    // this.dislikeClickEvent.emit();
    if (this.type === CommentType.Comment) {
      this.forumService.downvoteComment(this.id).subscribe(_ => {
        const _dislikeCount = this.dislikeCount + 1;
        this.dislikeCount = _dislikeCount;
        this.cdref.detectChanges();

        console.log(_dislikeCount);
      });
    } else {
      this.forumService.downvoteForumPost(this.id).subscribe(_ => {
        const _dislikeCount = this.dislikeCount + 1;
        this.dislikeCount = _dislikeCount;
        this.cdref.detectChanges();

        console.log(_dislikeCount);
      });
    }
  }
}
