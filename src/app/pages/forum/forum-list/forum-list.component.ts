import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { forumSelectors } from '../../../store/selectors/forum.selectors';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumListComponent implements OnInit {
  forums$ = this.store.select(forumSelectors.all);
  loadingForums$ = this.store.select(forumSelectors.loading);

  constructor(private store: Store) {}
  ngOnInit() {}
}
