import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ForumEndpoint } from 'src/app/config/routes';
import { AppUploadedImage } from 'src/app/models/article.model';
import { Forum } from 'src/app/models/forum.model';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class ForumsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ForumEndpoint);
  }

  searchForum(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as Forum[])
    );
  }

  addForum(forum: Forum, imageToUpload?: File) {
    const formData = this.getFormDataFromForumObject(forum, imageToUpload);
    return this.storeResource(formData).pipe(map(data => data as Forum));
  }

  editForum(forum: Forum, imageToUpload?: File) {
    const formData = this.getFormDataFromForumObject(forum, imageToUpload);

    return this.updateResourcePut(formData, forum.id).pipe(
      map(data => data as Forum)
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