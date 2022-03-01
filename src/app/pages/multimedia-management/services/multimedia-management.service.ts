import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ResourceService } from 'src/app/services/resources.service';
import { MultiMedia } from 'src/app/models/multimedia.model';
import { MultiMediaEndpoint } from 'src/app/config/routes';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class MultiMediaService extends ResourceService {
  constructor(
    http: HttpClient,
    private store: Store,
    transferState: TransferStateService
  ) {
    super(http, MultiMediaEndpoint, transferState);
  }

  searchMultiMedia(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as MultiMedia[])
    );
  }

  addMultiMedia(multimedia: MultiMedia) {
    return this.storeResource(multimedia).pipe(map(data => data as MultiMedia));
  }

  editMultiMedia(multimedia: MultiMedia) {
    return this.updateResource(multimedia, multimedia.id).pipe(
      map(data => data as MultiMedia)
    );
  }
}
