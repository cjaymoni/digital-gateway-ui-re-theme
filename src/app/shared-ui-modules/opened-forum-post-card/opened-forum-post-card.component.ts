import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  filter,
  interval,
  map,
  Subscription,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  CommentType,
  POLLING_INTERVAL,
  trackById,
  VoteType,
} from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { ForumPostsService } from 'src/app/pages/forum-posts/services/forum-post.service';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-opened-forum-post-card',
  templateUrl: './opened-forum-post-card.component.html',
  styleUrls: ['./opened-forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenedForumPostCardComponent implements OnInit, OnDestroy {
  showCommentForm: boolean = false;

  commentAddedSubscription!: Subscription;

  forumPost$ = this.store.select(forumSelectors.selectedForumPost);

  loading$ = this.store.select(forumSelectors.loading);

  forumComments$ = this.store.select(forumSelectors.commentsOfSelectedForum);

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  VoteType = VoteType;

  trackById = trackById;

  CommentType = CommentType;

  currentCommentCount$ = this.forumComments$.pipe(
    map(comments => comments?.length || 0)
  );

  pollInterval = interval(POLLING_INTERVAL);

  reloadCommentSubscription!: Subscription;

  constructor(
    public domSanitizer: DomSanitizer,
    private store: Store,
    private action$: Actions,
    private forumPostService: ForumPostsService
  ) {}

  ngOnInit() {
    this.commentAddedSubscription = this.action$
      .pipe(
        ofType(forumActions.comments.addCommentSuccessful),
        tap(_ => (this.showCommentForm = false))
      )
      .subscribe();

    this.reloadCommentSubscription = this.pollInterval
      .pipe(
        withLatestFrom(this.forumPost$, this.currentCommentCount$),
        switchMap(([_, forumPost, currentCommentCount]) => {
          return this.forumPostService.commentCount(forumPost.id).pipe(
            filter(
              retrievedCommentCount =>
                retrievedCommentCount != currentCommentCount
            ),
            tap(_ =>
              this.store.dispatch(
                forumActions.fetchNewComments({ id: forumPost.id })
              )
            )
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.commentAddedSubscription?.unsubscribe();
    this.reloadCommentSubscription?.unsubscribe();
  }

  displayCommentForm() {
    this.showCommentForm = true;
  }

  hideCommentForm() {
    this.showCommentForm = false;
  }

  addCommentToForumPost(comment: string) {
    this.forumPost$
      .pipe(
        take(1),
        map(selectedForum => {
          this.store.dispatch(
            forumActions.comments.addComment({
              comment: {
                text: comment,
                post: selectedForum.id,
                author: 1,
                subcomments: [],
                slug: slugify(comment),
              },
            })
          );
        })
      )
      .subscribe();
  }

  likeForumPost() {
    this.forumPost$
      .pipe(
        take(1),
        map(selectedForum => {
          this.store.dispatch(
            forumActions.likePost({
              id: selectedForum.id,
            })
          );
        })
      )
      .subscribe();
  }

  dislikeForumPost() {
    this.forumPost$
      .pipe(
        take(1),
        map(selectedForum => {
          this.store.dispatch(
            forumActions.dislikePost({
              id: selectedForum.id,
            })
          );
        })
      )
      .subscribe();
  }
}
