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
import { CommentType, Pages } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Comment } from 'src/app/models/comments.model';
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

  subscription!: Subscription;

  showCommentForm: boolean = false;

  CommentType = CommentType;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private action$: Actions
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
  }

  dislikeComment() {
    this.store.dispatch(
      forumActions.comments.dislikeComment({
        id: this.comment.id,
      })
    );
  }

  loadSubcomments() {
    if (this.loadSubCommentsOnClick) {
      this.navigator.forum.openPanel(
        [Pages.Forum.main, 'comments', this.comment.id],
        'COMMENTS'
      );
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
          console.log(id === this.comment.id);
        })
      )
      .subscribe();
  }
}
