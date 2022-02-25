import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistrictEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';
import { TransferStateService } from './transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class DistrictService extends ResourceService {
  constructor(httpClient: HttpClient, transferState: TransferStateService) {
    super(httpClient, DistrictEndpoint, transferState);
  }
}
