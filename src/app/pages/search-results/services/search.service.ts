import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchEndpoint } from 'src/app/config/routes';
import { ResourceService } from 'src/app/services/resources.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends ResourceService {
  constructor(http: HttpClient, transferState: TransferStateService) {
    super(http, SearchEndpoint, transferState);
  }

  searchAll(query: string) {
    return this.http.get(this.endpoint.replace('{query}', query.trim()));
  }
}
