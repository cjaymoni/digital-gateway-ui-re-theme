import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ForumPostEndpoint } from 'src/app/config/routes';
import { ForumPost } from 'src/app/models/forum.model';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class ForumPostsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ForumPostEndpoint);
  }

  searchForumPost(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map((data: any) => data.results as ForumPost[])
    );
  }

  addForumPost(forum: ForumPost) {
    const formData = this.getFormDataFromForumPostObject(forum);
    return this.storeResource(formData).pipe(map(data => data as ForumPost));
  }

  editForumPost(forum: ForumPost) {
    const formData = this.getFormDataFromForumPostObject(forum);
    return this.updateResourcePut(formData, forum.id).pipe(
      map(data => data as ForumPost)
    );
  }

  private getFormDataFromForumPostObject(forumPost: ForumPost) {
    const formData = new FormData();

    for (const key in forumPost) {
      const data = (forumPost as any)[key];

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
