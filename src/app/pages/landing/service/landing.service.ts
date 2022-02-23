import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DigiLinksEndpoint } from 'src/app/config/routes';
import { ResourceService } from 'src/app/services/resources.service';

@Injectable({
  providedIn: 'root',
})
export class LandingService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, DigiLinksEndpoint);
  }
}
