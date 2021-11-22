import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient, CategoryEndpoint);
  }
}
