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
import { map, Subscription, take, tap } from 'rxjs';
import { slugify } from 'src/app/helpers/app.helper.functions';
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
  // @Input()
  commentAddedSubscription!: Subscription;

  forumPost$ = this.store.select(forumSelectors.selectedForumPost);

  forumComments$ = this.store.select(forumSelectors.commentsOfSelectedForum);

  constructor(
    public domSanitizer: DomSanitizer,
    private store: Store,
    private action$: Actions
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

  trackById(index: number, comment: any): number {
    return comment.id;
  }
}
