import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  delay,
  filter,
  map,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { TODAY_FORUM } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { LoadingPageStyle } from 'src/app/shared-ui-modules/listing-page/listing-page.component';
import { forumSelectors } from '../../../store/selectors/forum.selectors';
import { ForumPostsService } from '../../forum-posts/services/forum-post.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumListComponent implements OnInit {
  loadingStyle = LoadingPageStyle.Rectangle;
  loadingElementClass = 'col-12 mb-4';

  forums$ = this.store.select(forumSelectors.all).pipe(
    filter(d => !!d),
    debounceTime(500),
    switchMap(forums => {
      return this.forumPostService.todayForumPostCount().pipe(
        take(1),
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
    private forumPostService: ForumPostsService,
    private navigator: NavigatorService
  ) {}

  ngOnInit() {}

  goToAddForumPost() {
    this.navigator.forumPost.goToAddPage();
  }
}

