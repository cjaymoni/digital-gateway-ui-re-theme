import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { serialize } from '../helpers/serializer';
import { AppUploadedImage } from '../models/article.model';
import { TransferStateService } from './transfer-state.service';

export class ResourceService {
  protected DATA_KEY = '';
  constructor(
    protected http: HttpClient,
    protected endpoint: string,
    protected transferState: TransferStateService
  ) {
    this.DATA_KEY = endpoint.replace(/\//g, '');
  }

  getOneResource(id: any, url: string = this.endpoint, dataKey = undefined) {
    const oneRequest = this.http
      .get(`${url + id}/`)
      .pipe(map(data => data as any));
    return this.transferState.fetch(
      dataKey ? dataKey : this.DATA_KEY,
      oneRequest
    );
  }

  getResources(
    url = this.endpoint,
    pagination?: { page: string | any; page_size: string | any },
    otherParams?: { [key: string]: any },
    withPagination = false,
    dataKey: string | undefined = undefined
  ): Observable<any[]> {
    const allRequest = this.http
      .get(`${url}`, { params: { ...otherParams, ...pagination } })
      .pipe(
        map((data: any) => (withPagination ? data : (data.results as any[])))
      );

    return this.transferState.fetch(
      dataKey ? dataKey : this.DATA_KEY + JSON.stringify(otherParams),
      allRequest
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

  searchResource(
    searchParams: { [key: string]: any },
    dataKey: string | undefined = undefined
  ) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    const searchRequest = this.getResources(
      this.endpoint,
      undefined,
      searchParams
    ).pipe(map(data => data as any[]));

    return this.transferState.fetch(
      dataKey ? dataKey : this.DATA_KEY + 'search',
      searchRequest
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
