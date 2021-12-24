import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductTypeEndpoint } from '../config/routes';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient, ProductTypeEndpoint);
  }
}
