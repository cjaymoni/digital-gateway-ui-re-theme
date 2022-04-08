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
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumDetailsComponent implements OnInit {
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
}

