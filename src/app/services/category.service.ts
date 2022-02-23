import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CategoryEndpoint } from '../config/routes';
import { Category } from '../models/category.model';
import { ResourceService } from './resources.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient, CategoryEndpoint);
  }

  addCategory(category: Category, image?: File[]) {
    const formData = this.getFormDataFromObject(category, image);
    if (image?.length! > 0) {
      formData.append('image', image![0]);
    }

    return this.http
      .post(`${this.endpoint}`, formData)
      .pipe(map(data => data as Category));
  }

  editCategory(category: Category, image?: File[]) {
    const formData = this.getFormDataFromObject(category, image);

    if (image?.length! > 0) {
      formData.append('image', image![0]);
    }
    return this.http
      .patch(`${this.endpoint}${category.id}/`, formData)
      .pipe(map(data => data as Category));
  }
}
