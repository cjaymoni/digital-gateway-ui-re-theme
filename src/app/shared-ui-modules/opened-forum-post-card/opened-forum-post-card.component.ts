import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, interval, map, Subscription, switchMap, take, tap } from 'rxjs';
import { CommentType, trackById, VoteType } from 'src/app/config/app-config';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { ForumPostsService } from 'src/app/pages/forum-posts/services/forum-post.service';

@Component({
  selector: 'app-opened-forum-post-card',
  templateUrl: './opened-forum-post-card.component.html',
  styleUrls: ['./opened-forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenedForumPostCardComponent implements OnInit, OnDestroy {
  showCommentForm: boolean = false;
  // @Input()
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

  currentCommentCount$ = this.forumPost$.pipe(
    map(value => {
      const count = value.comments.length;
      return count;
    })
  );

  commentCount$ = this.forumPost$.pipe(
    map(value => {
      const id = value.id;
      let count: any;
      this.forumPostService.commentCount(id).subscribe(d => count = d);
      return count;
    })
  );

  pollInterval = interval(10000);
  reloadCommentSubscription = this.pollInterval.pipe(
    switchMap(q => {
      return this.commentCount$.pipe(
        filter(commentNumber => commentNumber !== this.currentCommentCount$),
        map(commentCount => this.currentCommentCount$ = commentCount),
        tap(_ => {
          this.store.dispatch(forumActions)
        })
      )
    })
  ).subscribe();

  constructor(
    public domSanitizer: DomSanitizer,
    private store: Store,
    private action$: Actions,
    private forumPostService: ForumPostsService,
  ) {}

  ngOnInit() {
    this.commentAddedSubscription = this.action$
      .pipe(
        ofType(forumActions.comments.addCommentSuccessful),
        tap(_ => (this.showCommentForm = false))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.commentAddedSubscription?.unsubscribe();
    this.reloadCommentSubscription.unsubscribe();
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
