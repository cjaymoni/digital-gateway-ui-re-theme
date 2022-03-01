import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';
import { TransferStateService } from './transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends ResourceService {
  constructor(httpClient: HttpClient, transferState: TransferStateService) {
    super(httpClient, TagEndpoint, transferState);
  }
}
