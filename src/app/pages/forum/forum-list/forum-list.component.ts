import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { TODAY_FORUM } from 'src/app/config/app-config';
import { forumSelectors } from '../../../store/selectors/forum.selectors';
import { ForumPostsService } from '../../forum-posts/services/forum-post.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumListComponent implements OnInit {
  forums$ = this.store.select(forumSelectors.all).pipe(
    switchMap(forums => {
      return this.forumPostService.todayForumPostCount().pipe(
        map(count => {
          const todayForum = { ...TODAY_FORUM, count };
          return [todayForum, ...forums];
        })
      );
    })
  );
  loadingForums$ = this.store.select(forumSelectors.loading);

  constructor(
    private store: Store,
    private forumPostService: ForumPostsService
  ) {}

  ngOnInit() {}
}

