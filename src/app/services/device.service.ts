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
import {
  MOBILE_WIDTH_BREAKPOINT as MOBILE_WIDTH,
  TABLET_WIDTH_BREAKPOINT,
} from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  isHandheld$ = new BehaviorSubject(
    window.innerWidth < TABLET_WIDTH_BREAKPOINT
  );

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(ev => (ev.target as Window).innerWidth < TABLET_WIDTH_BREAKPOINT),
        startWith(window.innerWidth < TABLET_WIDTH_BREAKPOINT),
        debounceTime(100),
        distinctUntilChanged(),
        shareReplay(1)
      )
      .subscribe(this.isHandheld$);
  }
}
