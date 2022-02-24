import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ResourceService } from 'src/app/services/resources.service';
import { DigitalLink } from 'src/app/models/digital-link.model';
import { DirectLinkEndpoint } from 'src/app/config/routes';

@Injectable({
  providedIn: 'root'
})
export class DigitalLinkService extends ResourceService {
  constructor(http: HttpClient, private store: Store) {
    super(http, DirectLinkEndpoint);
  }

  searchDigitalLink(searchParams: { [key: string]: any }) {
    for (const key in searchParams) {
      const element = searchParams[key];
    }
    return this.getResources(this.endpoint, undefined, searchParams).pipe(
      map(data => data as DigitalLink[])
    );
  }

  addDigitalLink(digitallink: DigitalLink) {
    return this.storeResource(digitallink).pipe(map(data => data as DigitalLink));
  }

  editDigitalLink(digitallink: DigitalLink) {
    return this.updateResource(digitallink, digitallink.id).pipe(
      map(data => data as DigitalLink)
    );
  }

  getFeaturedLinks(){
    return this.getResources(this.endpoint, undefined, {'featured': 'True'}).pipe(
      map(data => data as DigitalLink[])
    );
  }

}
