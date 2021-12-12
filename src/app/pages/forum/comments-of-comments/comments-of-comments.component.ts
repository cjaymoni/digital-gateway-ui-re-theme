import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  Observable,
  Subscription,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Comment } from 'src/app/models/comments.model';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { selectRouteNestedParam } from 'src/app/store/selectors/router.selectors';
import { ComponentStore } from '@ngrx/component-store';
import { ForumsService } from '../services/forums.service';
import { Actions, ofType } from '@ngrx/effects';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { trackById } from 'src/app/config/app-config';
export interface CommentRepliesState {
  comment: Comment | any;
}

@Component({
  selector: 'app-comments-of-comments',
  templateUrl: './comments-of-comments.component.html',
  styleUrls: ['./comments-of-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsOfCommentsComponent
  extends ComponentStore<CommentRepliesState>
  implements OnInit, OnDestroy
{
  commentLoadSubscription!: Subscription;

  trackById = trackById;

  readonly subComments$: Observable<Comment[]> = this.select(
    (state: CommentRepliesState) => state.comment?.subcomments || []
  );

  readonly comment$: Observable<Comment | undefined> = this.select(
    (state: CommentRepliesState) => state?.comment
  );

  constructor(
    private store: Store,
    private forumService: ForumsService,
    private action$: Actions
  ) {
    super({ comment: null });
  }

  addSubComment(comment: Comment) {
    this.setState(state => {
      const subcomments = [comment].concat(state.comment?.subcomments || []);
      return {
        comment: {
          ...state.comment,
          subcomments: subcomments,
        } as CommentRepliesState,
      };
    });
  }

  addSubCommentToSubComment(comment: Comment) {
    this.setState(state => {
      const subcommentsCopy = [...state.comment.subcomments];
      const updatedSubcomments = subcommentsCopy.map((c: Comment) => {
        const _comment = { ...c };
        if (comment.parent === _comment.id) {
          _comment.subcomments = [comment].concat(_comment.subcomments || []);
        }
        return _comment;
      });

      return {
        comment: {
          ...state.comment,
          subcomments: updatedSubcomments,
        } as CommentRepliesState,
      };
    });
  }

  ngOnInit(): void {
    this.commentLoadSubscription = this.store
      .select(selectRouteNestedParam('comment-id'))
      .pipe(
        filter(d => !!d),
        takeUntil(this.destroy$),
        tap(commentId => {
          this.forumService.fetchComment(commentId).subscribe(comment => {
            this.setState({ comment });
          });
        })
      )
      .subscribe();

    this.action$
      .pipe(
        ofType(forumActions.comments.addCommentSuccessful),
        withLatestFrom(this.comment$),
        tap(d => console.log(d)),
        filter(
          ([{ comment }, stateComment]) =>
            comment.parent === stateComment?.id ||
            Boolean(
              stateComment!.subcomments!.findIndex(
                (sc: Comment) => sc.id === comment.parent
              ) > -1
            )
        ),
        map(([{ comment }, stateComment]) => {
          console.log('this is my syb comment comment');
          if (comment.parent === stateComment?.id) {
            this.addSubComment(comment);
          } else {
            this.addSubCommentToSubComment(comment);
          }
        })
      )
      .subscribe();
  }
}
