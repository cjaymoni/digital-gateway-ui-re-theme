import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CommentType, VoteType } from 'src/app/config/app-config';
import { ForumsService } from 'src/app/pages/forum/services/forums.service';

interface VoteResponse {
  downvotes: number;
  score: number;
  upvotes: number;
  user: { voted: boolean; type: VoteType };
}

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent implements OnInit {
  @Input() disableLike = false;
  @Input() disableDislike = false;

  @Input() liked = false;
  @Input() disliked = false;

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
      this.forumService
        .upvoteComment(this.id)
        .subscribe((response: VoteResponse) => this.updateVotes(response));
    } else {
      this.forumService
        .upvoteForumPost(this.id)
        .subscribe((response: VoteResponse) => this.updateVotes(response));
    }
  }

  dislike() {
    // this.dislikeClickEvent.emit();
    if (this.type === CommentType.Comment) {
      this.forumService
        .downvoteComment(this.id)
        .subscribe((response: VoteResponse) => this.updateVotes(response));
    } else {
      this.forumService
        .downvoteForumPost(this.id)
        .subscribe((response: VoteResponse) => this.updateVotes(response));
    }
  }

  updateVotes(voteResponse: VoteResponse) {
    this.dislikeCount = voteResponse.downvotes;
    this.likeCount = voteResponse.upvotes;
    if (!voteResponse.user.voted) {
      this.liked = false;
      this.disliked = false;
    } else {
      this.liked = voteResponse.user.type === VoteType.upvote;
      this.disliked = voteResponse.user.type === VoteType.downvote;
    }
    this.cdref.detectChanges();
  }
}
