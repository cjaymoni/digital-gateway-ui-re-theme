import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SLUG_PREFIX } from 'src/app/config/app-config';
import { forumPostActions } from '../../../store/actions/forum-post.action';

@Injectable({
  providedIn: 'root',
})
export class SelectForumPostGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {
    this.store.dispatch(forumPostActions.fetch());
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const forumPostId = route.url[0].path.split(':')[1];
    this.store.dispatch(
      forumPostActions.findAndSelectForumPostById({
        id: forumPostId,
      })
    );

    return true;
  }
}
