import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  /**
   * The state keys.
   */
  private keys = new Map<string, StateKey<string>>();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly transferState: TransferState
  ) {}

  fetch<T>(
    key: string,
    observableInput: Observable<T>,
    defaultValue?: T
  ): Observable<T> {
    if (this.has(key)) {
      return of(this.get(key, defaultValue)).pipe(
        tap(() => this.remove(key))
      ) as any;
    }
    return observableInput.pipe(tap(value => this.set(key, value)));
  }

  get<T>(key: string, defaultValue?: T | null): T | null {
    if (!this.has(key)) {
      return defaultValue || null;
    }
    const value: any = this.transferState.get<T>(
      this.getStateKey(key),
      defaultValue as any
    );
    return value;
  }

  has(key: string): boolean {
    return this.transferState.hasKey(this.getStateKey(key));
  }

  remove(key: string): void {
    if (!this.has(key)) {
      return;
    }
    this.transferState.remove(this.getStateKey(key));
  }

  set<T>(key: string, value: T): void {
    if (isPlatformServer(this.platformId)) {
      if (this.has(key)) {
        console.warn(
          `Setting existing value into TransferState using key: '${key}'`
        );
      }
      if (!environment.production) {
        console.log(`Storing TransferState for: '${key}'`);
      }
      this.transferState.set(this.getStateKey(key), value as any);
    }
  }

  private getStateKey(key: string): StateKey<string> {
    if (this.keys.has(key)) {
      return this.keys.get(key) as any;
    }
    this.keys.set(key, makeStateKey(key));
    return this.keys.get(key) as any;
  }
}
