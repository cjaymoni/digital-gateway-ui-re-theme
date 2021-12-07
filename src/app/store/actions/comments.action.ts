import { Update } from '@ngrx/entity';
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
}
