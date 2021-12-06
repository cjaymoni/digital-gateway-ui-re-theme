import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-right-overlay-panel',
  templateUrl: './right-overlay-panel.component.html',
  styleUrls: ['./right-overlay-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightOverlayPanelComponent implements OnInit, OnDestroy {
  constructor(
    private navigator: NavigatorService,
    public device: DeviceService,
    private cdref: ChangeDetectorRef
  ) {}

  show = false;

  subscription!: Subscription;

  title$ = this.navigator.getPanelTitle();

  ngOnInit(): void {
    this.subscription = this.navigator.panelActive$
      .pipe(
        map(active => (this.show = active)),
        tap(_ => this.cdref.detectChanges())
      )
      .subscribe();
  }

  hidePanel() {
    // this.
    this.navigator.hidePanel();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
