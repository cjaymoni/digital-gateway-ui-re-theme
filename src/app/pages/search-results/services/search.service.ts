import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchEndpoint } from 'src/app/config/routes';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, SearchEndpoint);
  }

  searchAll(query: string) {
    return this.http.get(this.endpoint.replace('{query}', query.trim()));
  }
}
