import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take, tap } from 'rxjs';
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
      .select(selectRouteNestedParams)
      .pipe(
        filter(d => Object.keys(d).length > 0),
        take(1),
        tap((params: any) => {
          if (params['post-slug']) {
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

          if (params.slug) {
            this.store.dispatch(
              forumActions.findAndSelectForum({
                searchParams: {
                  slug: params.slug,
                },
              })
            );
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
