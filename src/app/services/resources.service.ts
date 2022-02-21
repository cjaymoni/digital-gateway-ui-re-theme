import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { serialize } from '../helpers/serializer';
import { AppUploadedImage } from '../models/article.model';

export class ResourceService {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  getOneResource(id: any, url: string = this.endpoint) {
    return this.http.get(`${url + id}/`).pipe(map(data => data as any));
  }

  getResources(
    url = this.endpoint,
    pagination?: { page: string | any; page_size: string | any },
    otherParams?: { [key: string]: any },
    withPagination = false
  ): Observable<any[]> {
    return this.http
      .get(`${url}`, { params: { ...otherParams, ...pagination } })
      .pipe(
        map((data: any) => (withPagination ? data : (data.results as any[])))
      );
  }

  storeResource(toStore: any, url = this.endpoint) {
    return this.http.post(`${url}`, toStore).pipe(map(data => data as object));
  }

  updateResource(toStore: any, id: any, url = this.endpoint, override = false) {
    return this.http
      .patch(`${override ? url : url + id + '/  '}`, toStore)
      .pipe(map(data => data as object));
  }

  updateResourcePut(toStore: any, id: any, url = this.endpoint) {
    return this.http
      .put(`${url + id + '/'}`, toStore)
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
    delete object['images'];
    const formData = serialize(object);

    if (imageToUpload) {
      if (Array.isArray(imageToUpload) && imageToUpload.length > 0) {
        imageToUpload.forEach((imgToUpload, index) => {
          // determine if it is old or new
          // old images already have a title and image property

          const oldImage = Boolean(imgToUpload.id);

          if (oldImage) {
            formData.append(
              `${propertyNameToAppend}images[${index}]id`,
              imgToUpload.id
            );
          } else {
            formData.append(
              `${propertyNameToAppend}images[${index}]title`,
              imgToUpload.name
            );

            formData.append(
              `${propertyNameToAppend}images[${index}]image`,
              imgToUpload
            );
          }
        });
      }
    } else {
      formData.append(propertyNameToAppend + 'images', '');
    }

    return formData;
  }
}
