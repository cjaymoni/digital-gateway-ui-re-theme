import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AppUploadedImage } from '../models/article.model';

export class ResourceService {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  getOneResource(id: any, url: string = this.endpoint) {
    return this.http.get(`${url + id}/`);
  }

  getResources(
    url = this.endpoint,
    pagination?: { page: string | any; pageSize: string | any },
    otherParams?: { [key: string]: any }
  ): Observable<any[]> {
    return this.http
      .get(`${url}`, { params: { ...otherParams } })
      .pipe(map(data => data as any[]));
  }

  storeResource(toStore: any, url = this.endpoint) {
    return this.http.post(`${url}/`, toStore).pipe(map(data => data as object));
  }

  updateResource(toStore: any, id: any, url = this.endpoint) {
    return this.http
      .patch(`${url + id}/`, toStore)
      .pipe(map(data => data as object));
  }

  updateResourcePut(toStore: any, id: any, url = this.endpoint) {
    return this.http
      .put(`${url + id}/`, toStore)
      .pipe(map(data => data as object));
  }

  deleteResource(id: any, url = this.endpoint) {
    return this.http.delete(`${url + id}/`);
  }

  searchResource(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as any[])
    );
  }

  protected getFormDataFromObject(
    object: any,
    imageToUpload?: File | AppUploadedImage[] | File[] | any
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
    for (const key in object) {
      const data = (object as any)[key];

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
