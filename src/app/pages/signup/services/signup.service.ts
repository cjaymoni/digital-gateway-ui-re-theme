import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/services/resources.service';
import { AuthEndpoint } from '../../../config/routes';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, AuthEndpoint);
  }

  signup(formData: any) {
    return this.storeResource(formData);
  }
}
