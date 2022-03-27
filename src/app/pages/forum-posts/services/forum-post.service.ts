import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ForumPostEndpoint } from 'src/app/config/routes';
import { ForumPost } from 'src/app/models/forum.model';
import { ResourceService } from 'src/app/services/resources.service';
import { forumPostActions } from '../../../store/actions/forum-post.action';
import { Store } from '@ngrx/store';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class ForumPostsService extends ResourceService {
  constructor(
    http: HttpClient,
    private store: Store,
    transferState: TransferStateService
  ) {
    super(http, ForumPostEndpoint, transferState);
  }

  searchForumPost(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map((data: any) => data.results as ForumPost[])
    );
  }

  addForumPost(forum: ForumPost, images?: File[]) {
    const formData = this.getFormDataFromObject(forum, images);
    return this.storeResource(formData).pipe(map(data => data as ForumPost));
  }

  editForumPost(forum: ForumPost, images?: File[]) {
    const formData = this.getFormDataFromObject(forum, images);
    return this.updateResourcePut(formData, forum.id).pipe(
      map(data => data as ForumPost)
    );
  }

  editForumPostStatus(formData: any, forumPostId: any) {
    return this.updateResource(formData, forumPostId).pipe(
      map(data => data as ForumPost),
      tap(forumpost =>
        this.store.dispatch(
          forumPostActions.editForumPostSuccessful({
            updatedForumPost: { id: forumpost.id, changes: forumpost },
          })
        )
      )
    );
  }

  commentCount(id: number) {
    return this.getResources(`${ForumPostEndpoint+id}/count-comments/`).pipe(map(data => data));
  }
}
