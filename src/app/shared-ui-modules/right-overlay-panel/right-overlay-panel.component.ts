import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { selectCurrentRoute } from 'src/app/store/selectors/router.selectors';

@Component({
  selector: 'app-right-overlay-panel',
  templateUrl: './right-overlay-panel.component.html',
  styleUrls: ['./right-overlay-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightOverlayPanelComponent implements OnInit {
  title = 'Comments'
  constructor(private store: Store, private navigator: NavigatorService) {}

  active$ = this.store.select(selectCurrentRoute).pipe(
    filter(currentRoute => currentRoute && currentRoute.outlet),
    map(cr => cr.outlet === RouterOutlets.Right)
  );

  ngOnInit(): void {}

  hidePanel() {
    this.navigator.hidePanel();
  }
}
