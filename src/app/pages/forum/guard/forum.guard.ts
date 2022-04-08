import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, take, tap } from 'rxjs';
import { TODAY_FORUM } from 'src/app/config/app-config';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { selectRouteNestedParams } from 'src/app/store/selectors/router.selectors';
import { forumActions } from '../../../store/actions/forum.actions';

@Injectable({
  providedIn: 'root',
})
export class ForumGuard implements CanActivate {
  /**
   *
   */
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.dispatch(forumActions.startLoading());

    const reloadData = route.data['reload'];
    if (reloadData) {
      // this.store.dispatch(forumActions.clearAllSelected());
      this.store.dispatch(forumActions.fetch());
    }

    this.store
      .select(selectRouteNestedParams)
      .pipe(
        filter(d => Object.keys(d).length > 0),
        // tap(_ => this.store.dispatch(forumActions.clearAllSelected())),
        take(1),
        tap((params: any) => {
          if (params.slug && params.slug != TODAY_FORUM.slug) {
            this.store.dispatch(
              forumActions.findAndSelectForum({
                searchParams: {
                  slug: params.slug,
                },
              })
            );
          }

          if (params['post-slug'] && params.slug) {
            this.store
              .select(
                forumSelectors.selectedForumPostBySlug(params['post-slug'])
              )
              .pipe(
                filter(d => !!d),
                take(1),
                map(forumPost => {
                  if (forumPost)
                    this.store.dispatch(
                      forumActions.selectForumPost({
                        forumPost,
                      })
                    );
                })
              )
              .subscribe();
          }

          if (params['comment-id']) {
            this.store
              .select(forumSelectors.selectedCommentById(params['comment-id']))
              .pipe(
                filter(d => !!d),
                take(1),
                map(comment => {
                  if (comment)
                    this.store.dispatch(
                      forumActions.comments.selectComment({
                        comment,
                      })
                    );
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();

    return true;
  }
}

