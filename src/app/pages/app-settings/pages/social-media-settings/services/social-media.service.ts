import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ResourceService } from 'src/app/services/resources.service';
import { SocialMedia } from 'src/app/models/social-media.model';
import { SocialMediaEndpoint } from 'src/app/config/routes';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService extends ResourceService {

  constructor(
    http: HttpClient,
    private store: Store,
    transferState: TransferStateService,
  ) {
    super(http, SocialMediaEndpoint, transferState);
  }

  // searchSocialMedia(searchParams: { [key: string]: any }) {
  //   for (const key in searchParams) {
  //     const element = searchParams[key];
  //   }
  //   return this.getResources(this.endpoint, undefined, searchParams).pipe(
  //     map(data => data as SocialMedia[])
  //   );
  // }

  getSocialMedia() {
    return this.getResources().pipe(map(data  => data as SocialMedia[]));
  }

  addSocialMedia(socialmedia: SocialMedia) {
    return this.storeResource(socialmedia).pipe(map(data => data as SocialMedia));
  }

  editSocialMedia(socialmedia: SocialMedia) {
    return this.updateResource(socialmedia, socialmedia.id).pipe(
      map(data => data as SocialMedia)
    );
  }

}
