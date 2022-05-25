import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { ForumPost } from '../../../models/forum.model';
import { forumPostSelectors } from '../../../store/selectors/forum-post.selectors';

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
      { header: 'UPVOTES', field: 'upvotes' },
      { header: 'DOWNVOTES', field: 'downvotes' },
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
    this.navigator.forumPost.goToViewPage(
      forumPost.id,
      'Preview Forum Post',
      RouterOutlets.Modal
    );
  }

  editForumPost(forumPost: ForumPost) {
    this.navigator.forumPost.goToEditPage(
      forumPost.id,
      'Edit Forum Post',
      RouterOutlets.Modal
    );
  }
}

