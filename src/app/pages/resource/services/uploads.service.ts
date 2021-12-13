import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ResourceEndpoint } from 'src/app/config/routes';
import { ResourceService } from 'src/app/services/resources.service';
import { Upload } from 'src/app/models/uploads.model';

@Injectable({
  providedIn: 'root'
})
export class UploadsService extends ResourceService {
  constructor(http: HttpClient) {
    super(http, ResourceEndpoint);
  }

  addUpload(upload: Upload, file: File) {
    const formData = this.getFormDataFromObject(upload)
    formData.append('resource',file)
    return this.storeResource(formData).pipe(map(data => data as Upload));
  }

  getUpload() {
    return this.getResources().pipe(map(data  => data as Upload[]));

  }

}
