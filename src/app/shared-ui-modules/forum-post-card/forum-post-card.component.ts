import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ForumPost } from 'src/app/models/forum.model';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';

@Component({
  selector: 'app-forum-post-card',
  templateUrl: './forum-post-card.component.html',
  styleUrls: ['./forum-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostCardComponent implements OnInit {
  @Input() forumPost!: ForumPost;

  @Input() avatar: any;

  constructor(private navigator: NavigatorService, private store: Store) {}

  selectedForum$ = this.store.select(forumSelectors.selectedForum);

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
