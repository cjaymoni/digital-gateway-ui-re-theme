import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticlesEndpoint } from 'src/app/config/routes';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ArticlesEndpoint);
  }
}
