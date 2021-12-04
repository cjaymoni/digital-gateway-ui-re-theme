import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumPostSelectors } from '../../../store/selectors/forum-post.selectors';
import { ForumPost } from '../../../models/forum.model';
import { Pages } from 'src/app/config/app-config';
import { forumPostActions } from '../../../store/actions/forum-post.action';

@Component({
  selector: 'app-my-forum-posts',
  templateUrl: './my-forum-posts.component.html',
  styleUrls: ['./my-forum-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyForumPostsComponent implements OnInit, AfterViewInit {
  myForumPosts$ = this.store.select(forumPostSelectors.all);

  columns: any[] = [];

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private title: Title
  ) {}

  ngAfterViewInit(): void {
    this.columns = [
      { header: 'TITLE', field: 'title' },
      { header: 'COMMENTS', field: 'comment_count' },
      { header: 'UPVOTES', field: 'upvote_count' },
      { header: 'DOWNVOTES', field: 'downvote_count' },
      { header: 'SCORE', field: 'score' },
    ];
  }

  ngOnInit() {
    this.title.setTitle('My Forum Posts');
  }

  goToAddForumPostPage() {
    this.navigator.forumPost.goToAddPage();
  }

  viewForumPost(forumPost: ForumPost) {
    this.selectForumPost(forumPost);
    this.navigator.forum.goToViewPage(forumPost.id, 'Preview Forum Post');
  }

  editForumPost(forumPost: ForumPost) {
    this.store.dispatch(
      forumPostActions.selectForumPostToEdit({
        forumPost,
      })
    );
    this.navigator.forumPost.goToViewPage(forumPost.id, 'Edit Forum Post');
  }

  private selectForumPost(forumPost: ForumPost) {
    this.store.dispatch(
      forumPostActions.selectForumPost({
        forumPost,
      })
    );
  }
}
