import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export class ResourceService {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  getOneResource(id: any, url: string = this.endpoint) {
    return this.http.get(`${url + '/' + id}`);
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
    return this.http.post(`${url}`, toStore);
  }

  updateResource(toStore: any, id: any, url = this.endpoint) {
    return this.http.patch(`${url + '/' + id}`, toStore);
  }

  updateResourcePut(toStore: any, id: any, url = this.endpoint) {
    return this.http.put(`${url + '/' + id}`, toStore);
  }

  deleteResource(id: any, url = this.endpoint) {
    return this.http.delete(`${url + '/' + id}`);
  }
}
