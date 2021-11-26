import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-right-overlay-panel',
  templateUrl: './right-overlay-panel.component.html',
  styleUrls: ['./right-overlay-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightOverlayPanelComponent implements OnInit {
  title = 'Comments';
  constructor(private navigator: NavigatorService) {}

  active$ = this.navigator.panelActive$;

  ngOnInit(): void {}

  hidePanel() {
    this.navigator.hidePanel();
  }
}
