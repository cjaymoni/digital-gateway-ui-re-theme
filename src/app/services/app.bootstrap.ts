import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoryActions } from '../store/actions/category.actions';
import { productTypeActions } from '../store/actions/product-type.actions';
import { tagActions } from '../store/actions/tag.actions';
import { articleActions } from '../store/actions/article.actions';
import { productAdActions } from '../store/actions/product-ad.actions';
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
    this.store.dispatch(productTypeActions.fetch());
    this.store.dispatch(articleActions.fetch());
    this.store.dispatch(productAdActions.fetch());
    this.store.dispatch(forumActions.fetch());
  }
}
