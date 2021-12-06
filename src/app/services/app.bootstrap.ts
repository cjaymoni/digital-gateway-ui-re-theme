import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { categoryActions } from '../store/actions/category.actions';
import { productTypeActions } from '../store/actions/product-type.actions';
import { tagActions } from '../store/actions/tag.actions';
import { forumActions } from '../store/actions/forum.actions';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppBootstrap {
  /**
   *
   */
  constructor(private store: Store, private router: Router) {}

  initializeAppData() {
    this.store.dispatch(tagActions.fetch());
    this.store.dispatch(categoryActions.fetch());
    this.store.dispatch(productTypeActions.fetch());
  }
}
