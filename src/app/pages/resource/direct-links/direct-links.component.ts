import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { digitalLinkSelectors } from 'src/app/store/selectors/digital-link.selectors';
import { digitalLinkActions } from 'src/app/store/actions/digital-link.actions';

@Component({
  selector: 'app-direct-links',
  templateUrl: './direct-links.component.html',
  styleUrls: ['./direct-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectLinksComponent implements OnInit {

  linkList$ =  this.store.select(digitalLinkSelectors.all);
  loadingLinkList$ =  this.store.select(digitalLinkSelectors.loading);

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(digitalLinkActions.fetch());
  }

  ngOnInit() {
  }

}
