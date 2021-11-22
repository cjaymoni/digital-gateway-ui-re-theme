import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  shareReplay,
  startWith,
} from 'rxjs';
import { MOBILE_WIDTH_BREAKPOINT as MOBILE_WIDTH } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  isHandheld$ = new BehaviorSubject(window.innerWidth < MOBILE_WIDTH);

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(ev => (ev.target as Window).innerWidth < MOBILE_WIDTH),
        startWith(window.innerWidth < MOBILE_WIDTH),
        debounceTime(100),
        distinctUntilChanged(),
        shareReplay(1)
      )
      .subscribe(this.isHandheld$);
  }
}
