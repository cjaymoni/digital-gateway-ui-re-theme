import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FrequentlyAskedQuestionsEndpoint } from 'src/app/config/routes';
import { FAQ } from 'src/app/models/faqs.model';
import { ResourceService } from 'src/app/services/resources.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class FaqsService extends ResourceService {
  constructor(http: HttpClient, transferState: TransferStateService) {
    super(http, FrequentlyAskedQuestionsEndpoint, transferState);
  }

  getQuestions() {
    return this.getResources().pipe(map(r => r as FAQ[]));
  }
}

