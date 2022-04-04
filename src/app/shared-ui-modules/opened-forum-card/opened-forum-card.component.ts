import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { TODAY_FORUM } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { selectRouteNestedParams } from 'src/app/store/selectors/router.selectors';
import { forumSelectors } from '../../store/selectors/forum.selectors';

@Component({
  selector: 'app-opened-forum-card',
  templateUrl: './opened-forum-card.component.html',
  styleUrls: ['./opened-forum-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenedForumCardComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    public sanitizer: DomSanitizer,
    private title: Title,
    private navigator: NavigatorService
  ) {}

  @Input() forum$ = this.store.select(forumSelectors.selectedForum).pipe(
    filter(forum => !!forum),
    tap(forum => this.title.setTitle('Forum | ' + forum.name))
  );
  forumPosts$ = this.store
    .select(forumSelectors.postsOfSelectedForum)
    .pipe(filter(d => !!d));
  loadingForums$ = this.store.select(forumSelectors.loading);

  todayPostSubscription$ = this.store
    .select(selectRouteNestedParams)
    .pipe(
      // tap(_ => console.log(_)),
      filter((params: any) => params.slug && params.slug === TODAY_FORUM.slug),
      tap((params: any) =>
        this.store.dispatch(forumActions.findAndSelectTodayForum())
      )
    )
    .subscribe();

  ngOnInit() {}
  reply() {}

  goToAddForumPost() {
    this.navigator.forumPost.goToAddPage();
  }

  ngOnDestroy(): void {
    this.todayPostSubscription$.unsubscribe();
  }
}

