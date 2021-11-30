import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { serialize } from '../helpers/serializer';
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
    return this.http.post(`${url}`, toStore).pipe(map(data => data as object));
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
    imageToUpload?: File | AppUploadedImage[] | File[] | any,
    propertyNameToAppend = ''
  ) {
    const formData = serialize(object);

    if (imageToUpload) {
      if (Array.isArray(imageToUpload) && imageToUpload.length > 0) {
        imageToUpload.forEach((imgToUpload, index) => {
          // determine if it is old or new
          // old images already have a title and image property

          const oldImage = Boolean(imgToUpload.title && imgToUpload.image);

          formData.append(
            `${propertyNameToAppend}images[${index}]image`,
            oldImage ? imgToUpload.image : imgToUpload
          );
          formData.append(
            `${propertyNameToAppend}images[${index}]title`,
            oldImage ? imgToUpload.title : imgToUpload.name
          );
        });
        // array means image didnt change so use same value
      } else {
        formData.append(
          propertyNameToAppend + 'images[0]image',
          imageToUpload,
          imageToUpload.name
        );
        formData.append(
          propertyNameToAppend + 'images[0]title',
          imageToUpload.name
        );
      }
    } else {
      formData.append(propertyNameToAppend + 'images', '');
    }

    return formData;
  }
}
