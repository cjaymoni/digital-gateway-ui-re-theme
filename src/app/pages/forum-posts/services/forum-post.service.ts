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
}
