import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';
import { forumActions } from 'src/app/store/actions/forum.actions';
import { selectRouteNestedParam } from 'src/app/store/selectors/router.selectors';
import { forumPostActions } from '../../../store/actions/forum-post.action';

@Injectable({
  providedIn: 'root',
})
export class ForumPostGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(forumActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store
      .select(selectRouteNestedParam('forum-post-id'))
      .pipe(
        filter(d => !!d),
        take(1),
        tap(forumPostId => {
          this.store.dispatch(
            forumPostActions.findAndSelectForumPostById({
              id: forumPostId,
            })
          );
        })
      )
      .subscribe();
    return true;
  }
}
