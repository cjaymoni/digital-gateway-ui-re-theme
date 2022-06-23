import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContactUsEndpoint } from 'src/app/config/routes';

export interface ContactUsData {
  contact: string;
  full_name: string;
  message: string;
  region: string;
  location: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactUsFormService {
  constructor(private readonly httpClient: HttpClient) {}

  sendData(data: ContactUsData) {
    return this.httpClient.post(ContactUsEndpoint, data).pipe(map(_ => true));
  }
}

