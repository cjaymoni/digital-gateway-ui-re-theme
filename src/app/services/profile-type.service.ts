import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileTypeEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTypeService extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient, ProfileTypeEndpoint);
  }
}
