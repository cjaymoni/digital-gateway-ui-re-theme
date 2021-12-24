import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { NavigatorService } from '../services/navigator.service';
import { AppAlertService } from '../shared-ui-modules/alerts/service/app-alert.service';

@Directive({
  selector: '[proceedIfLoggedIn]',
})
export class LoadingButtonDirective implements OnInit, OnDestroy {
  @Output() onProceed = new EventEmitter();
  @Input() loadObserverable!: Observable<boolean>;

  private subscription!: Subscription;
  // private button =

  constructor(
    private element: ElementRef,
    private alert: AppAlertService,
    private store: Store,
    private navigator: NavigatorService
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.subscription = this.loadObserverable
      .pipe(
        tap(_ => this.setLoadingTrue()),
        tap({
          error: () => this.setLoadingFalse(),
        })
      )
      .subscribe(_ => this.setLoadingFalse());
  }

  setLoadingTrue() {}

  setLoadingFalse() {}
}
