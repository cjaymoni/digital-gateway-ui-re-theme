import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserProfileEndpoint } from 'src/app/config/routes';
import { Avatar, UserProfile } from 'src/app/models/user-auth.model';
import { ResourceService } from 'src/app/services/resources.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends ResourceService {
  constructor(http: HttpClient, transferState: TransferStateService) {
    super(http, UserProfileEndpoint, transferState);
  }

  editProfile(profile: any, imageToUpload?: File[] | any[]) {
    const formData = this.getFormDataFromUserObject(profile);
    if (imageToUpload?.length! > 0) {
      formData.append('avatar', imageToUpload![0]);
    }
    return this.updateResource(formData, profile.id).pipe(
      map(data => data as UserProfile)
    );
  }

  private getFormDataFromUserObject(
    profile: UserProfile,
    imageToUpload?: File | Avatar[] | any
  ) {
    const dataToStore = this.getFormDataFromObject(profile, imageToUpload);

    return dataToStore;
  }
}
