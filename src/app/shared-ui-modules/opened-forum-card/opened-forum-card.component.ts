import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { forumSelectors } from '../../store/selectors/forum.selectors';

@Component({
  selector: 'app-opened-forum-card',
  templateUrl: './opened-forum-card.component.html',
  styleUrls: ['./opened-forum-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenedForumCardComponent implements OnInit {
  constructor(
    private store: Store,
    public sanitizer: DomSanitizer,
    private title: Title
  ) {}

  @Input() forum$ = this.store.select(forumSelectors.selectedForum).pipe(
    filter(forum => !!forum),
    tap(forum => this.title.setTitle(forum.name))
  );

  ngOnInit() {}
  reply() {}
}
