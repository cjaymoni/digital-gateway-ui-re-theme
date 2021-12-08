import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-comments-of-comments',
  templateUrl: './comments-of-comments.component.html',
  styleUrls: ['./comments-of-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsOfCommentsComponent implements OnInit {
  selectedCommentComments$ = this.store.select(
    forumSelectors.commentsOfSelectedComment
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
