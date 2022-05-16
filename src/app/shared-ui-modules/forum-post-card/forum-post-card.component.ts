import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { ForumPost } from 'src/app/models/forum.model';
import { DeviceService } from 'src/app/services/device.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { VotesDirection } from '../votes/votes.component';

@Component({
  selector: 'app-forum-post-card',
  templateUrl: './forum-post-card.component.html',
  styleUrls: ['./forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostCardComponent implements OnInit {
  @Input() forumPost!: ForumPost;

  @Input() avatar: any;

  constructor(
    private navigator: NavigatorService,
    private store: Store,
    private device: DeviceService
  ) {}

  selectedForum$ = this.store.select(forumSelectors.selectedForum);

  direction$ = this.device.isHandheld$.pipe(
    map(hh => (hh ? VotesDirection.VERTICAL : VotesDirection.HORIZONTAL))
  );
  ngOnInit(): void {}

  openForumPost() {
    this.selectedForum$.pipe(take(1)).subscribe(selectedForum => {
      this.navigator.forum.goToReadForumPost(
        selectedForum.slug as string,
        this.forumPost?.slug || ''
      );
    });
  }

  dislikeForum() {}
  likeForum() {}
}

