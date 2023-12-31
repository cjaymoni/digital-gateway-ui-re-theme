import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { VoteType } from 'src/app/config/app-config';
import {
  CommentsEndpoint,
  ForumEndpoint,
  ForumPostEndpoint,
} from 'src/app/config/routes';
import { AppUploadedImage } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comments.model';
import { Forum } from 'src/app/models/forum.model';
import { ResourceService } from 'src/app/services/resources.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class ForumsService extends ResourceService {
  constructor(http: HttpClient, transferState: TransferStateService) {
    super(http, ForumEndpoint, transferState);
  }

  searchForum(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as Forum[])
    );
  }

  findForumUsingSlug(slug: string) {
    return this.searchForum({ slug });
  }

  addForum(forum: Forum) {
    return this.storeResource(forum).pipe(map(data => data as Forum));
  }

  editForum(forum: Forum) {
    return this.updateResourcePut(forum, forum.id).pipe(
      map(data => data as Forum)
    );
  }

  postComment(comment: Comment) {
    return this.storeResource(comment, CommentsEndpoint).pipe(
      map(comment => comment as Comment)
    );
  }

  upvoteComment(id: any) {
    return this.updateResource(
      {
        vote_type: VoteType.upvote,
      },
      null,
      CommentsEndpoint + id + '/vote/',
      true
    ).pipe(map(comment => comment as any));
  }

  downvoteComment(id: any) {
    return this.updateResource(
      {
        vote_type: VoteType.downvote,
      },
      null,
      CommentsEndpoint + id + '/vote/',
      true
    ).pipe(map(comment => comment as any));
  }

  upvoteForumPost(id: any) {
    return this.updateResource(
      {
        vote_type: VoteType.upvote,
      },
      null,
      ForumPostEndpoint + id + '/vote/',
      true
    ).pipe(map(comment => comment as any));
  }

  downvoteForumPost(id: any) {
    return this.updateResource(
      {
        vote_type: VoteType.downvote,
      },
      null,
      ForumPostEndpoint + id + '/vote/',
      true
    ).pipe(map(comment => comment as any));
  }

  fetchComment(id: number) {
    return this.getOneResource(id, CommentsEndpoint).pipe(
      map(comment => comment as Comment)
    );
  }

  private getFormDataFromForumObject(
    forum: Forum,
    imageToUpload?: File | AppUploadedImage[] | any
  ) {
    const formData = new FormData();
    if (imageToUpload) {
      if (Array.isArray(imageToUpload)) {
        // array means image didnt change so use same value
        formData.append('images[0]image', imageToUpload[0].image);
        formData.append('images[0]title', imageToUpload[0].title);
      } else {
        formData.append('images[0]image', imageToUpload, imageToUpload.name);
        formData.append('images[0]title', imageToUpload.name);
      }
    } else {
      formData.append('images', '');
    }
    for (const key in forum) {
      const data = (forum as any)[key];

      if (Array.isArray(data)) {
        if (data.length > 0) {
          data.forEach(v => formData.append(key, v));
        }
      } else {
        formData.append(key, data);
      }
    }

    return formData;
  }
}
