import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  filter,
  map,
  Subscription,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CommentType, Pages, VoteType } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Comment } from 'src/app/models/comments.model';
import { DeviceService } from 'src/app/services/device.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() comment!: Comment;

  @Input() loadSubCommentsOnClick = false;

  @Input() showSubComments = false;

  @Input() showCommentButton = true;

  @Input() sidePanel = false;

  subscription!: Subscription;

  showCommentForm: boolean = false;

  CommentType = CommentType;

  isHandheld$ = this.device.isHandheld$;

  VoteType = VoteType;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private action$: Actions,
    private device: DeviceService,
    private gtag: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.subscription = this.updateSubcommentListSubscription();
    this.subscription.add(this.updateLikeSubscription());
    this.subscription.add(this.updateDislikeSubscription());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  show() {
    this.showCommentForm = true;
  }

  addCommentToForumPost(comment: string) {
    this.store
      .select(forumSelectors.selectedForumPost)
      .pipe(
        take(1),
        tap(forumPost => {
          this.store.dispatch(
            forumActions.comments.addComment({
              comment: {
                slug: slugify(comment),
                parent: this.comment.id,
                text: comment,
                author: 1,
                subcomments: [],
                post: forumPost.id,
              },
            })
          );
          this.gtag.Events.commentOnForumPost(forumPost);
        })
      )
      .subscribe(_ => (this.showCommentForm = false));
  }

  hideCommentForm() {
    this.showCommentForm = false;
  }

  likeComment() {
    this.store.dispatch(
      forumActions.comments.likeComment({
        id: this.comment.id,
      })
    );
    this.gtag.Events.likeComment();
  }

  dislikeComment() {
    this.store.dispatch(
      forumActions.comments.dislikeComment({
        id: this.comment.id,
      })
    );
    this.gtag.Events.dislikeComment();
  }

  loadSubcomments() {
    if (this.loadSubCommentsOnClick) {
      this.navigator.forum.loadComments(this.comment.id);
    } else {
      this.showSubComments = !this.showSubComments;
    }
  }

  updateSubcommentListSubscription() {
    return this.action$
      .pipe(
        ofType(forumActions.comments.addCommentSuccessful),
        map(({ comment }) => {})
      )
      .subscribe();
  }

  updateLikeSubscription() {
    return this.action$
      .pipe(
        ofType(forumActions.comments.likeCommentSuccessful),
        filter(({ id }) => id === this.comment.id),
        debounceTime(500),
        map(({ id }) => {
          const newComment = { ...this.comment };
          newComment.upvotes++;
          this.comment = newComment;
        })
      )
      .subscribe();
  }

  updateDislikeSubscription() {
    return this.action$
      .pipe(
        ofType(forumActions.comments.dislikeCommentSuccessful),
        debounceTime(500),
        filter(({ id }) => id === this.comment.id),
        map(({ id }) => {
          this.comment.downvotes++;
        })
      )
      .subscribe();
  }
}

