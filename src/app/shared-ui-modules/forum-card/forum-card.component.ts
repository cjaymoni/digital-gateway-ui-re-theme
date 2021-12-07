import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Forum } from 'src/app/models/forum.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from 'src/app/store/actions/forum.actions';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumCardComponent implements OnInit {
  @Input() forum: Forum | null = null;

  constructor(private store: Store, private navigator: NavigatorService) {}

  ngOnInit() {}

  openForum() {
    this.store.dispatch(
      forumActions.selectForum({
        forum: this.forum as Forum,
      })
    );

    this.navigator.forum.goToViewDetailsPage(this.forum?.slug as string);
  }

  dislikeForum() {}
  likeForum() {}
}
