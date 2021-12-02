import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoryActions } from '../store/actions/category.actions';
import { tagActions } from '../store/actions/tag.actions';
import { forumActions } from '../store/actions/forum.actions';

@Injectable({
  providedIn: 'root',
})
export class AppBootstrap {
  /**
   *
   */
  constructor(private store: Store) {}

  initializeAppData() {
    this.store.dispatch(tagActions.fetch());
    this.store.dispatch(categoryActions.fetch());
    this.store.dispatch(forumActions.fetch());
  }
}
