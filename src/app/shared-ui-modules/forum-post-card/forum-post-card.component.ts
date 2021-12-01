import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Forum } from 'src/app/models/forum.model';
import { Store } from '@ngrx/store';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from '../../store/actions/forum.actions';

@Component({
  selector: 'app-forum-post-card',
  templateUrl: './forum-post-card.component.html',
  styleUrls: ['./forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostCardComponent implements OnInit {
  @Input() forum: Forum | null = null;

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit(): void {}

  openForum() {
    this.store.dispatch(
      forumActions.selectForum({
        forum: this.forum as Forum,
      })
    );

    this.navigator.forum.goToReadForumPage(this.forum?.name as string);
  }
}
