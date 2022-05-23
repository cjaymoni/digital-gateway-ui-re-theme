import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ResourceService } from 'src/app/services/resources.service';
import { IPartners, Image } from 'src/app/models/partners.model';
import { PartnersEndpoint } from 'src/app/config/routes';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root'
})
export class PartnersService extends ResourceService {

  constructor(
    http: HttpClient,
    transferState: TransferStateService
  ) {
    super(http, PartnersEndpoint, transferState);
  }

  addPartner(partner: IPartners, imageToUpload?: File[]) {
    const formData = this.getFormDataFromPartnerObject(partner, imageToUpload);
    if (imageToUpload?.length! > 0) {
      formData.append('image', imageToUpload![0]);
    }
    return this.storeResource(formData).pipe(
      map(data => data as IPartners)
    );
  }

  editPartner(partner: IPartners, imageToUpload?: File[] | any[]) {
    const formData = this.getFormDataFromPartnerObject(partner);

    if (imageToUpload?.length! > 0 && typeof imageToUpload !== "string") {
      formData.append('image', imageToUpload![0]);
    }
    return this.updateResource(formData, partner.id).pipe(
      map(data => data as IPartners)
    );
  }

  searchPartner(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as IPartners[])
    );
  }

  private getFormDataFromPartnerObject(
    partner: IPartners,
    imageToUpload?: File | Image[] | any
  ) {
    const dataToStore = this.getFormDataFromObject(partner, imageToUpload);

    return dataToStore;
  }

}
