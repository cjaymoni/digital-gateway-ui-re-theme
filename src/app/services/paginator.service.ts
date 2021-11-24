import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from '../config/app-config';
import { PaginatorDetails } from '../models/paginator.model';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  public refreshData = new Subject<any>();

  totalSelected = DEFAULT_PAGE_SIZE;

  public paginatorDetails: PaginatorDetails = {
    current_page: 0,
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: [],
    total: 0,
    next_page_url: '',
    path: '',
    per_page: DEFAULT_PAGE_SIZE,
    prev_page_url: '',
    to: 0,
  };

  constructor() {}

  setPaginatorDetails(data: PaginatorDetails) {
    this.paginatorDetails = data;
  }

  getPaginatorDetails(): PaginatorDetails {
    return this.paginatorDetails;
  }
}
