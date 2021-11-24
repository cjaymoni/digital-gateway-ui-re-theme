import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient, TagEndpoint);
  }
}
