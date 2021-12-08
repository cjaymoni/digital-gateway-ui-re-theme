import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/models/comments.model';

export class CommentActions {
  readonly type = '[Comments Actions]';

  fetch = createAction(`${this.type} Fetch`);

  addComment = createAction(
    `${this.type} Add Comment`,
    props<{ comment: Comment }>()
  );

  addCommentSuccessful = createAction(
    `${this.type} Add Comment Successful`,
    props<{ comment: Comment }>()
  );

  likeComment = createAction(
    `${this.type} Like Comment`,
    props<{
      id: number;
    }>()
  );

  likeCommentSuccessful = createAction(
    `${this.type} Like Comment Successful`,
    props<{
      id: number;
    }>()
  );

  dislikeComment = createAction(
    `${this.type} Dislike Comment`,
    props<{
      id: number;
    }>()
  );

  dislikeCommentSuccessful = createAction(
    `${this.type} Dislike Comment Successful`,
    props<{
      id: number;
    }>()
  );

  selectComment = createAction(
    `${this.type} Select Comment`,
    props<{
      comment: Comment;
    }>()
  );
}
