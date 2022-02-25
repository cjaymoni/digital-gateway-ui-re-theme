import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/services/resources.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';
import { SignUpEndpoint } from '../../../config/routes';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends ResourceService {
  constructor(http: HttpClient, transferState: TransferStateService) {
    super(http, SignUpEndpoint, transferState);
  }

  signup(formData: any) {
    return this.storeResource(formData);
  }
}
