import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { slugify } from 'src/app/helpers/app.helper.functions';
import { Comment } from 'src/app/models/comments.model';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: Comment;

  showCommentForm: boolean = false;
  constructor(private store: Store) {}

  ngOnInit() {}

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
      .subscribe();
  }

  hideCommentForm() {
    this.showCommentForm = false;
  }

  likeComment() {}

  dislikeComment() {}
}
