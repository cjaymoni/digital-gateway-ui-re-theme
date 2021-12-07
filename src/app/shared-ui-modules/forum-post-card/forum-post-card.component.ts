import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { NavigatorService } from 'src/app/services/navigator.service';
import { forumActions } from '../../store/actions/forum.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { take } from 'rxjs';
import { ForumPost } from 'src/app/models/forum.model';

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
    public domSanitizer: DomSanitizer,
    private store: Store
  ) {}

  selectedForum$ = this.store.select(forumSelectors.selectedForum);

  ngOnInit(): void {}

  openForumPost() {
    this.selectedForum$.pipe(take(1)).subscribe(selectedForum => {
      console.log(selectedForum.slug, this.forumPost?.slug);

      this.navigator.forum.goToReadForumPost(
        selectedForum.slug as string,
        this.forumPost?.slug || ''
      );
    });
  }

  dislikeForum() {}
  likeForum() {}
}
